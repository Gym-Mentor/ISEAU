from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from django.http import Http404, HttpResponse
from rest_framework import status
from json.decoder import JSONDecodeError
from rest_framework import permissions
from django.http.response import JsonResponse
from rest_framework.response import Response
from .models import Fishing, Scrap, Review
from .serializers import *
from django.db.models import Avg, Sum, Count
from drf_yasg.utils import swagger_auto_schema
from haversine import haversine
#  Create your views here.


class fishingScrap(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request, fishingId):
        try:
            user = request.user
            fishing_id = fishingId

            if not fishing_id:
                return JsonResponse({'message': 'KEY_ERROR'}, status=400)

            if not Fishing.objects.filter(id=fishing_id).exists():
                return JsonResponse({'message': "FISHING_DOES_NOT_EXIST"}, status=404)

            if Scrap.objects.filter(user_id=user.id, fishing_id=fishing_id).exists():
                Scrap.objects.filter(
                    user_id=user.id, fishing_id=fishing_id).delete()
                scrap_count = Scrap.objects.filter(
                    fishing_id=fishing_id).count()
                return JsonResponse({'message': 'SUCCESS delete', 'scrap_count': scrap_count}, status=200)

            Scrap.objects.create(user_id=user.id, fishing_id=fishing_id)
            scrap_count = Scrap.objects.filter(fishing_id=fishing_id).count()
            return JsonResponse({'message': 'SUCCESS create', 'scrap_count': scrap_count}, status=200)

        except JSONDecodeError:
            return JsonResponse({'message': 'JSON_DECODE_ERROR'}, status=400)


class ScrapList(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, userId, format=None):
        scrapQuery = Scrap.objects.filter(user_id=userId).values()
        fishing_ids = []
        for i in scrapQuery:
            fishing_ids.append(i["fishing_id"])

        fishings = Fishing.objects.filter(id__in=fishing_ids)
        if fishings:
            serializered_data = FishingScrapSerializer(
                fishings, many=True).data
            for index, data in enumerate(serializered_data):
                reviewSum = Review.objects.filter(
                    fishing_id=data['id']).aggregate(Sum('rating'))
                if Review.objects.filter(fishing_id=data['id']).count():
                    reviewCnt = Review.objects.filter(
                        fishing_id=data['id']).count()
                    rating = round(reviewSum['rating__sum']/reviewCnt, 1)
                    data['reviewCnt'] = reviewCnt
                    data['rating'] = rating
                else:
                    data['reviewCnt'] = 0
                    data['rating'] = 0

            return Response(serializered_data)
        else:
            return Response({'message': '해당 유저의 Scrap이 없습니다.'}, status=204)


class fishingDetail(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, fishingId):
        reviewSum = Review.objects.filter(
            fishing_id=fishingId).aggregate(Sum('rating'))
        fishing = Fishing.objects.filter(id=fishingId)

        serializer = FishingScrapSerializer(fishing, many=True)

        if Review.objects.filter(fishing_id=fishingId).count():
            reviewCnt = Review.objects.filter(fishing_id=fishingId).count()
            rating = round(reviewSum['rating__sum']/reviewCnt, 1)
        else:
            reviewCnt = 0
            rating = 0

        serializer.data[0].update({'reviewCnt': reviewCnt})
        serializer.data[0].update({'rating': rating})

        return Response(serializer.data)


class reviewCreate(APIView):
    permission_classes = (permissions.AllowAny,)

    @swagger_auto_schema(request_body=ReviewCreateSerializer)
    def post(self, request, fishingId):
        review = Review.objects.filter(
            fishing_id=fishingId, user_id=request.user)
        if review:
            return Response({'message': '이미 생성된 Review가 있습니다!'}, status=400)
        else:
            fishing = get_object_or_404(Fishing, id=fishingId)

            request.data.update({'profileimg': request.user.profileimg})
            request.data.update({'username': request.user.username})
            request.data.update({'nickname': request.user.nickname})

            serializer = ReviewSerializer(data=request.data)

            if serializer.is_valid(raise_exception=True):  # 유효성 검사
                serializer.save(fishing=fishing, user=request.user)  # 저장
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class reviewCRUD(APIView):
    permission_classes = (permissions.AllowAny,)

    def get_object(self, pk):
        try:
            return Review.objects.get(pk=pk)
        except Review.DoesNotExist:
            raise Http404

    @swagger_auto_schema(request_body=ReviewCreateSerializer)
    def put(self, request, fishingId, reviewId, format=None):
        review = self.get_object(reviewId)
        request.data["fishing"] = fishingId
        request.data["user"] = request.user.id

        request.data['profileimg'] = request.user.profileimg
        request.data['username'] = request.user.username
        request.data['nickname'] = request.user.nickname

        serializer = ReviewUpdateSerializer(review, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, fishingId, reviewId, format=None):
        review = self.get_object(reviewId)
        review.delete()
        return Response({'deleted reviewId': reviewId}, status=status.HTTP_204_NO_CONTENT)


class reviewFishingIdList(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, fishingId, format=None):
        reviews = Review.objects.filter(fishing_id=fishingId)
        if reviews:
            serializer = ReviewSerializer(reviews, many=True)

            return Response(serializer.data)
        else:
            return HttpResponse(status=204)


class searchLoc(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, location):
        searchQuery = Fishing.objects.filter(address=location).annotate(reviewCnt=Count(
            'review__fishing_id')).annotate(rating=Avg('review__rating')).annotate(distance=Avg('review__rating'))
        if searchQuery:
            serializered_data = FishingSerializer(searchQuery, many=True).data

            return Response(serializered_data)
        else:
            return HttpResponse(status=204)


class searchFish(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, fish):
        searchQuery = Fishing.objects.filter(fish__contains=fish).annotate(reviewCnt=Count(
            'review__fishing_id')).annotate(rating=Avg('review__rating')).annotate(distance=Avg('review__rating'))
        if searchQuery:
            serializered_data = FishingSerializer(searchQuery, many=True).data

            return Response(serializered_data)
        else:
            return HttpResponse(status=204)


class autoLoc(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, location):
        searchQuery = Fishing.objects.filter(address__icontains=location).annotate(reviewCnt=Count(
            'review__fishing_id')).annotate(rating=Avg('review__rating')).annotate(distance=Avg('review__rating'))
        if searchQuery:
            serializered_data = FishingSerializer(searchQuery, many=True).data

            return Response(serializered_data)
        else:
            return HttpResponse(status=204)


class autoFish(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, fish):
        searchQuery = Fishing.objects.filter(fish__contains=fish).annotate(reviewCnt=Count(
            'review__fishing_id')).annotate(rating=Avg('review__rating')).annotate(distance=Avg('review__rating'))
        if searchQuery:
            serializered_data = FishingSerializer(searchQuery, many=True).data

            return Response(serializered_data)
        else:
            return HttpResponse(status=204)


class nearFishing(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, longitude, latitude):
        lon = float(longitude)
        lat = float(latitude)

        me = (lat, lon)

        fishings = Fishing.objects.all()

        lst = []
        for i in range(len(fishings)):
            des = (float(fishings[i].latitude), float(fishings[i].longitude))

            lst.append(
                (round(haversine(me, des, unit='km'), 1), fishings[i].id))

        lst.sort()

        lst = lst[:8]

        idList = []
        for i in range(len(lst)):
            idList.append(lst[i][1])

        fishings = Fishing.objects.filter(id__in=idList).annotate(reviewCnt=Count(
            'review__fishing_id')).annotate(rating=Avg('review__rating')).annotate(distance=Avg('review__rating'))
        serializered_data = FishingNearSerializer(fishings, many=True).data

        for i in range(len(lst)):
            pk = serializered_data[i]['id']
            for j in range(len(lst)):
                if pk == lst[j][1]:
                    serializered_data[i].update({'distance': lst[j][0]})

        serializered_data = sorted(
            serializered_data, key=lambda x: x['distance'])

        return Response(serializered_data, status=200)
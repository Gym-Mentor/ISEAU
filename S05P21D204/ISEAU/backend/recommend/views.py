from rest_framework.response import Response
import numpy as np
import pandas as pd
from rest_framework.views import APIView
from fishing.models import Review, Fishing
from rest_framework import permissions
from fishing.serializers import *
from .serializers import RecommendSerializer
from django.db.models import Avg, Count
# Create your views here.


class recommendList(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, userId, categoryId):
        user_reviews = Review.objects.filter(user_id=userId)

        if len(user_reviews) < 3:
            if categoryId == 2:
                fishing_datas = Fishing.objects.all().annotate(reviewCnt=Count(
                    'review__fishing_id')).annotate(rating=Avg('review__rating')).order_by('-rating')
                serializer_data = FishingSerializer(fishing_datas, many=True).data
                return Response(serializer_data)
            else:
                fishing_datas = Fishing.objects.filter(category=categoryId).annotate(reviewCnt=Count(
                    'review__fishing_id')).annotate(rating=Avg('review__rating')).order_by('-rating')
                serializer_data = FishingSerializer(fishing_datas, many=True).data
                return Response(serializer_data)

        else:
            fishing_datas = Fishing.objects.values()

            review_datas = Review.objects.values()

            fishings = pd.DataFrame(fishing_datas)
            fishings = fishings.rename(columns={'id': 'fishingId'})

            reviews = pd.DataFrame(review_datas)
            reviews = reviews.rename(
                columns={'id': 'reviewId', 'fishing_id': 'fishingId'})

            data = pd.merge(reviews, fishings, on='fishingId', how='inner')
            matrix = data.pivot_table(
                index='user_id', columns='fishingId', values='rating')

            obsPostId_WEIGHT = 0.1

            def pearsonR(s1, s2):
                s1_c = s1 - s1.mean()
                s2_c = s2 - s2.mean()
                return np.sum(s1_c * s2_c) / np.sqrt(np.sum(s1_c ** 2) * np.sum(s2_c ** 2))

            def recommend(input_fishingId, matrix, n, similar_genre=True):
                input_obsPostId = fishings[fishings['fishingId'] == input_fishingId]['obsPostId'].iloc(0)[
                    0]

                result = []
                for title in matrix.columns:
                    if title == input_fishingId:
                        continue

                    # rating comparison
                    cor = pearsonR(matrix[input_fishingId], matrix[title])

                    # genre comparison
                    if similar_genre and len(input_obsPostId) > 0:
                        temp_obsPostId = fishings[fishings['fishingId'] == title]['obsPostId'].iloc(0)[
                            0]
                        same_count = np.sum(
                            np.isin(input_obsPostId, temp_obsPostId))
                        cor += (obsPostId_WEIGHT * same_count)

                    if np.isnan(cor):
                        continue
                    else:
                        # 위치 기반 정보 넣어주고 cor에 더해주기(추후 작업)
                        result.append(
                            (title, '{:.2f}'.format(cor), temp_obsPostId))

                result.sort(key=lambda r: r[1], reverse=True)

                return result[:n]

            reviewList = Review.objects.filter(user_id=userId)
            reviewRatingUser = []
            for i in range(len(reviewList)):
                reviewRatingUser.append(
                    (reviewList[i].rating, reviewList[i].fishing_id))

            reviewRatingUser.sort(reverse=True)

            thirdList = []
            for x, y in reviewRatingUser[:3]:
                fishingData = Fishing.objects.filter(id=y)
                thirdList.append(fishingData[0].id)

            lst = thirdList

            res = []
            for i in range(len(lst)):
                recommend_result = recommend(
                    lst[i], matrix, 500, similar_genre=True)
                res.append(pd.DataFrame(recommend_result, columns=[
                           'fishingId', 'Correlation', 'obsPostId']))

            abc = pd.concat(res)

            result = abc.sort_values(
                by=['Correlation'], axis=0, ascending=False)

            abc = result['fishingId']
            fishing_list = []
            for i in abc:
                if i not in fishing_list:
                    fishing_list.append(i)
            if categoryId != 2:
                finaldata = Fishing.objects.filter(id__in=fishing_list, category=categoryId).annotate(
                    reviewCnt=Count('review__fishing_id')).annotate(rating=Avg('review__rating'))
            else:
                finaldata = Fishing.objects.filter(id__in=fishing_list).annotate(
                    reviewCnt=Count('review__fishing_id')).annotate(rating=Avg('review__rating'))

            serializer_data = RecommendSerializer(finaldata, many=True).data

            # sort_datas
            return Response(serializer_data)

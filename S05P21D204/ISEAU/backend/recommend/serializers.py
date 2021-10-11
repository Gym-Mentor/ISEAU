from rest_framework import serializers
from fishing.models import Fishing


class RecommendSerializer(serializers.ModelSerializer):
    reviewCnt = serializers.IntegerField(default=0)
    rating = serializers.DecimalField(max_digits=2, decimal_places=1)
    class Meta:
        model = Fishing
        fields = "__all__"

from rest_framework import serializers
from .models import Post, Profile
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token


User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'first_name', 'last_name', 'email')
        extra_kwargs = {'password': {'write_only':True, 'required':True}}
    
    def create(self, validate_data):
        user = User.objects.create_user(**validate_data)
        Token.objects.create(user=user)
        Profile.objects.create(user=user)
        return user
            
        
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'
        read_only_fields = ['user']
        
    def validate(self, attrs):
        attrs['user'] = self.context['request'].user
        return attrs
        
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['user'] = UserSerializer(instance.user).data
        return data


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'
        read_only_fields = ['user']
        depth = 1
        
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = ProfileSerializer(instance.user.profile).data
        return response

    def validate(self, obj):
        obj['user'] = self.context['request'].user
        return obj


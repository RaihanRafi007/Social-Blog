from django.shortcuts import render
from .serializers import PostSerializer, ProfileSerializer, UserSerializer
from .models import Post, Profile
from rest_framework import viewsets, views
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.models import User
from rest_framework.response import Response

# Create your views here.

class PostView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated,]
    authentication_classes = [TokenAuthentication,] 
    queryset = Post.objects.all().order_by('-id')
    serializer_class = PostSerializer
      

class ProfileView(views.APIView):
    permission_classes = [IsAuthenticated,]
    authentication_classes = [TokenAuthentication,]
    
    def get(self, request):
        user = request.user
        pquery = Profile.objects.get(user=user)
        serializer = ProfileSerializer(pquery)
        return Response({'message': 'Request is got', 'userdata': serializer.data})
        
    
class RegisterView(views.APIView):
    def post(self, request):
        serializers = UserSerializer(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response({'error': False, 'message': 'User successful', 'data': serializers.data})
        return Response({'error': True, 'message': 'A user with that username already exists! Try another Username'})



class UserDataUpdate(views.APIView):
    permission_classes = [IsAuthenticated,]
    authentication_classes = [TokenAuthentication,]
    
    def post(self, request):
        user = request.user
        data = request.data
        user_obj = User.objects.get(username=user)
        print(user_obj, '$$$$$$$$$$$$$$')
        user_obj.first_name = data['first_name']
        user_obj.last_name = data['last_name']
        user_obj.email = data['email']
        user_obj.save()
        return Response({'message': 'Userdata is Updated'})
        
class ProfileUpdate(views.APIView):
    permission_classes = [IsAuthenticated,]
    authentication_classes = [TokenAuthentication,]
    
    def post(self, request):
        try:
            user = request.user
            query = Profile.objects.get(user=user)
            serializer = ProfileSerializer(query, data=request.data, context={'request': request})
            serializer.is_valid()
            serializer.save()
            response_msg = {'error': False, 'message': 'Profile is Updated'}
        except:
            response_msg = {'error': True, 'message': 'Something is wrong!!'}
        return Response(response_msg)



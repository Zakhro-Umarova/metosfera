from django.urls import path
from django.contrib.auth.views import LogoutView  # Import the LogoutView
from .views import register, login_view, dashboard, PomodoroView, NotepadView, ForestView, IkigaiView, CoursesView, infobiteView, chatgptView
from .views import ProxyVideoView
from .views import ChatbotView

from .views import save_plant, save_allowlist, save_blocklist
from .views import my_plants_api, my_allowlist_api, my_blocklist_api

from .views import create_list_api, create_note_api, get_lists_api, get_notes_api, delete_list_api, delete_note_api, get_note_api, update_note_api

from .views import profile_settings

urlpatterns = [
    path('register/', register, name='register'),
    path('login/', login_view, name='login'),
    path('dashboard/', dashboard, name='dashboard'),
    path('logout/', LogoutView.as_view(), name='logout'),  # Add the logout URL
    path('pomodoro/', PomodoroView.as_view(), name='pomodoro'),
    path('notepad/', NotepadView.as_view(), name='notepad'),
    path('forest/', ForestView.as_view(), name='forest'),
    path('ikigai/', IkigaiView.as_view(), name='ikigai'),
    path('courses/', CoursesView.as_view(), name='courses'),
    path('infobite/', infobiteView.as_view(), name='infobite'),
    path('chatgpt/', chatgptView.as_view(), name='chatgpt'),
    path('chatbot/', ChatbotView.as_view(), name='chatbot'),  # Map the URL to the view

    path('proxy_video/<str:video_id>/', ProxyVideoView.as_view(), name='proxy_video'),



    path('api/create-list/', create_list_api, name='create_list_api'),
    path('api/create-note/', create_note_api, name='create_note_api'),
    path('api/get-lists/', get_lists_api, name='get_lists_api'),
    path('api/get-notes/<int:list_id>/', get_notes_api, name='get_notes_api'),

    path('api/get-note/<int:note_id>/', get_note_api, name='get_note'),
    path('api/update-note/<int:note_id>/', update_note_api, name='update_note'),  # New endpoint

    path('api/delete-list/<int:list_id>/', delete_list_api, name='delete_list_api'),
    path('api/delete-note/<int:note_id>/', delete_note_api, name='delete_note_api'),

    path('save-plant/', save_plant, name='save_plant'),
    path('save-allowlist/', save_allowlist, name='save_allowlist'),
    path('save-blocklist/', save_blocklist, name='save_blocklist'),
    path('api/my-plants/', my_plants_api, name='my_plants_api'),
    path('api/my-allowlist/', my_allowlist_api, name='my_allowlist_api'),
    path('api/my-blocklist/', my_blocklist_api, name='my_blocklist_api'),

    path('profile/settings/', profile_settings, name='profile_settings'),

]
from django.shortcuts import render

# Create your views here.
from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.shortcuts import render, redirect
from .forms import CustomUserCreationForm
from django.contrib.auth import login
from django.contrib.auth.decorators import login_required
from django.views.generic import TemplateView
from django.http import JsonResponse
import json
from .models import Plant, Allowlist, Blocklist


from .models import Note, List
from django.views import View
from django.http import HttpResponseNotFound
from django.utils.decorators import method_decorator
from django.http import JsonResponse
from django.core.exceptions import ObjectDoesNotExist
from django.views.decorators.http import require_POST
import requests
from django.http import HttpResponse
from django.views.decorators.http import require_http_methods

from .forms import ProfileUpdateForm
from django.http import HttpResponseServerError

from .chatbot_logic import chatbot  # Import the chatbot instance


def register(request):
    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST, request.FILES)
        if form.is_valid():
            user = form.save(commit=False)
            user.first_name = form.cleaned_data.get('first_name')
            user.last_name = form.cleaned_data.get('last_name')
            user.patronymic = form.cleaned_data.get('patronymic')
            user.username = form.cleaned_data.get('username')
            user.phone = form.cleaned_data.get('phone')
            user.university = form.cleaned_data.get('university')
            user.faculty = form.cleaned_data.get('faculty')
            user.group = form.cleaned_data.get('group')
            user.avatar = form.cleaned_data.get('avatar')
            user.save()
            login(request, user)
            return redirect('dashboard')
        else:
            print(form.errors)  # Print form errors to the console for debugging
    else:
        form = CustomUserCreationForm()

    return render(request, 'accounts/register.html', {'form': form})

def login_view(request):
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            return redirect('dashboard')
    return render(request, 'accounts/login.html')

class PomodoroView(TemplateView):
    template_name = 'accounts/pomodoro.html'

class NotepadView(View):
    template_name = 'accounts/notepad.html'

    @method_decorator(login_required, name='dispatch')
    def get(self, request, *args, **kwargs):
        user = request.user
        print(f":User  {user}")  # Debugging line
        try:
            lists = List.objects.filter(user=user)  # Get all lists for the logged-in user
            notes = Note.objects.filter(user=user)  # Get all notes for the logged-in user
            print(f"Lists: {lists}")  # Debugging line
            # Debugging line to print the lists and their IDs
            print("Lists and their IDs:")
            for list_item in lists:
                print(f"List ID: {list_item.id}, Title: {list_item.title}")  # Print the ID and title of each list

            print(f"Notes: {notes}")  # Debugging line
        except Exception as e:
            print(f"Error fetching lists or notes: {e}")  # Print any errors to the console
            return render(request, self.template_name, {'error': 'An error occurred while fetching data.'})

        context = {
            'lists': lists,
            # 'notes': notes,
        }
        return render(request, self.template_name, context)
class ForestView(TemplateView):
    template_name = 'accounts/forest.html'
class IkigaiView(TemplateView):
    template_name = 'accounts/IKIGAI.html'
class ChatbotView(View):
    def get(self, request):
        user_input = request.GET.get('message')  # Get the user's message from the request
        bot_response = chatbot.get_response(user_input)  # Get the chatbot's response
        return JsonResponse({'response': str(bot_response)})  # Return the response as JSON
class chatgptView(TemplateView):
    template_name = 'accounts/chatgpt.html'
class CoursesView(TemplateView):
    template_name = 'accounts/Courses.html'

class infobiteView(TemplateView):
    template_name = 'accounts/infobite.html'

    def render_to_response(self, context, **response_kwargs):
        response = super().render_to_response(context, **response_kwargs)
        response['Content-Security-Policy'] = (
            "default-src 'self'; "
            "script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://cdnjs.cloudflare.com; "
            "style-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://cdnjs.cloudflare.com; "
            "frame-src 'self' https://drive.google.com https://docs.google.com;"
        )
        return response


class ProxyVideoView(View):
    def get(self, request, video_id):
        # Construct the URL for the Google Drive video
        url = f"https://drive.google.com/uc?id={video_id}"

        # Make a request to the Google Drive URL
        response = requests.get(url)

        # Check if the request was successful
        if response.status_code == 200:
            # Return the video content with the correct content type
            return HttpResponse(response.content, content_type=response.headers['Content-Type'])
        else:
            # Handle errors (e.g., video not found)
            return HttpResponse("Video not found", status=404)

@login_required
def dashboard(request):
    # You can pass any context data to your template here
    user = request.user
    context = {
        'user': user
    }
    return render(request, 'accounts/dashboard.html', context)


@login_required
def create_list_api(request):
    if request.method == 'POST':
        data = json.loads(request.body)  # Get the JSON data from the request
        title = data.get('title')
        description = data.get('description', '')

        if not title:
            return JsonResponse({'error': 'Title is required.'}, status=400)

        new_list = List.objects.create(user=request.user, title=title, description=description)
        print(f"New list created: ID={new_list.id}, Title={new_list.title}")  # Debugging line
        return JsonResponse({'success': 'List created successfully.', 'list_id': new_list.id}, status=201)

    return JsonResponse({'error': 'Invalid request method.'}, status=405)

@login_required
@require_POST  # This decorator ensures that only POST requests are allowed
def create_note_api(request):
    try:
        # Check if the request is a file upload
        if request.FILES:
            list_id = request.POST.get('list_id')
            content = request.POST.get('content', '')  # Optional text content
            # Handle image upload
            if 'image' in request.FILES:
                image = request.FILES['image']
                note = Note.objects.create(user=request.user, list_id=list_id, content=content, image=image,    type='image',)
                return JsonResponse({'success': 'Image note saved successfully.', 'note_id': note.id}, status=201)

            # Handle audio upload
            elif 'audio' in request.FILES:
                audio = request.FILES['audio']
                note = Note.objects.create(user=request.user, list_id=list_id, content=content, audio=audio,    type='audio',)
                return JsonResponse({'success': 'Audio note saved successfully.', 'note_id': note.id}, status=201)

            # Handle video upload
            elif 'video' in request.FILES:
                video = request.FILES['video']
                note = Note.objects.create(user=request.user, list_id=list_id, content=content, video=video,    type='video',)
                return JsonResponse({'success': 'Video note saved successfully.', 'note_id': note.id}, status=201)

            # Handle file upload
            elif 'file' in request.FILES:
                file = request.FILES['file']
                note = Note.objects.create(user=request.user, list_id=list_id, content=content, file=file,    type='file',)
                return JsonResponse({'success': 'File note saved successfully.', 'note_id': note.id}, status=201)

            # If no files are uploaded, handle text notes
        else:
            data = json.loads(request.body)  # Get the JSON data from the request
            content = data.get('content')
            list_id = data.get('list_id')
            url = data.get('url')  # Get the URL if provided

            # if not content or not list_id:
            #  return JsonResponse({'error': 'Content and list ID are required.'}, status=400)
            if not list_id:
                return JsonResponse({'error': 'List ID is required.'}, status=400)

            # Get the list object
            note_list = List.objects.get(id=list_id, user=request.user)
            # If URL is provided, create a URL note
            if url:
                note = Note.objects.create(user=request.user, list=note_list, content=content, url=url, type='url')  # Assuming content is the URL
                return JsonResponse({'success': 'URL note saved successfully.', 'note_id': note.id}, status=201)

            # If content is provided, create a text note
            if content:
                color = data.get('color', 'red')  # Get the color or default to 'red' i
                note = Note.objects.create(user=request.user, list=note_list, content=content,   color=color, type='text')
                return JsonResponse({'success': 'Text note saved successfully.', 'note_id': note.id}, status=201)
            return JsonResponse({'error': 'Content or URL is required.'}, status=400)

    except List.DoesNotExist:
        return JsonResponse({'error': 'List not found.'}, status=404)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON.'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
@login_required
def get_lists_api(request):
    lists = List.objects.filter(user=request.user).values('id', 'title', 'description')
    return JsonResponse(list(lists), safe=False)

@login_required
def get_notes_api(request, list_id):
    notes = Note.objects.filter(list_id=list_id, user=request.user)
    response_data = []
    for note in notes:
        note_data = {
            'id': note.id,
            'created_at': note.created_at,
            'type': note.type,  # Add the type of the note
        }

        # Add content based on the type of note
        if note.type == 'text':
            note_data['content'] = note.content
            note_data['color'] = note.color  # Include the color for text notes
        elif note.type == 'url':
            note_data['url'] = note.url
        elif note.type == 'file':
            note_data['file'] = note.file.url if note.file else None
        elif note.type == 'image':
            note_data['image'] = note.image.url if note.image else None
        elif note.type == 'audio':
            note_data['audio'] = note.audio.url if note.audio else None
        elif note.type == 'video':
            note_data['video'] = note.video.url if note.video else None

        response_data.append(note_data)

    return JsonResponse(response_data, safe=False)

@login_required
def get_note_api(request, note_id):
    try:
        note = Note.objects.get(id=note_id, user=request.user)  # Ensure the user is the owner
        note_data = {
            'id': note.id,
            'content': note.content,
            'type': note.type,
            # Add other fields as necessary
        }
        return JsonResponse(note_data, status=200)
    except Note.DoesNotExist:
        return JsonResponse({'error': 'Note not found.'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@login_required
def delete_list_api(request, list_id):
    try:
        list_to_delete = List.objects.get(id=list_id, user=request.user)
        list_to_delete.delete()  # This will also delete all associated notes due to the ForeignKey relationship
        return JsonResponse({'success': 'List deleted successfully.'}, status=200)
    except List.DoesNotExist:
        return JsonResponse({'error': 'List not found.'}, status=404)

@login_required
def delete_note_api(request, note_id):
    try:
        note_to_delete = Note.objects.get(id=note_id, user=request.user)
        note_to_delete.delete()
        return JsonResponse({'success': 'Note deleted successfully.'}, status=200)
    except Note.DoesNotExist:
        return JsonResponse({'error': 'Note not found.'}, status=404)


@login_required
@require_http_methods(["PUT"])
def update_note_api(request, note_id):
    print("Received PUT request for note ID:", note_id)
    print("Request Files:", request.FILES)  # Log the files r
    try:
        note = Note.objects.get(id=note_id, user=request.user)  # Ensure the user is the owner

        # Check if the request is a file upload
        if request.FILES:
            if 'image' in request.FILES:
                note.image = request.FILES['image']
            elif 'audio' in request.FILES:
                note.audio = request.FILES['audio']
            elif 'video' in request.FILES:
                note.video = request.FILES['video']
            elif 'file' in request.FILES:
                note.file = request.FILES['file']

        # If the request is JSON, update the content
        if request.body:
            data = json.loads(request.body)  # Parse the JSON body
            note.content = data.get('content', note.content)  # Update content
            note.list_id = data.get('list_id', note.list_id)  # Update list if provided
            note.color = data.get('color', note.color)  # Update color if provided
            note.url = data.get('url', note.url)  # Update URL if provided

        note.save()  # Save the changes
        return JsonResponse({'success': True}, status=200)
    except Note.DoesNotExist:
        return JsonResponse({'error': 'Note not found.'}, status=404)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON.'}, status=400)
    except Exception as e:
        print(f"Error: {str(e)}")  # Log the error for debugging

        return JsonResponse({'error': str(e)}, status=500)

@login_required
def save_plant(request):
    print("Request method:", request.method)  # Debugging line
    if request.method == 'POST':
        print("POST data:", request.POST)  # Debugging line
        status = request.POST.get('status')
        image = request.POST.get('image')  # Assuming you are uploading an image // I changed  from image (request.FILE) into STRING (request.POST)
        date = request.POST.get('date')  # Format: YYYY-MM-DD
        time = request.POST.get('time')  # Time in minutes

        # Log the received data
        print(f"Status: {status}, Image: {image}, Date: {date}, Time: {time}")

        # Check if all required fields are present
        if not status or not image or not date or time is None:
            return JsonResponse({'error': 'All fields are required.'}, status=400)

        Plant.objects.create(
            user=request.user,
            status=status,
            image=image,
            date=date,
            time=time
        )
        return JsonResponse({'success': 'Plant saved successfully.'}, status=201)
        return JsonResponse({'error': 'Invalid request method.'}, status=405)


@login_required
def save_allowlist(request):
    if request.method == 'POST':
        data = json.loads(request.body)  # Get the JSON data from the request
        url = data.get('url')  # Extract the URL
        Allowlist.objects.create(user=request.user, url=url)  # Save to the database
        return JsonResponse({'success': 'URL added to allowlist.'}, status=201)
    return JsonResponse({'error': 'Invalid request method.'}, status=405)


@login_required
def save_blocklist(request):
    if request.method == 'POST':
        data = json.loads(request.body)  # Get the JSON data from the request
        url = data.get('url')  # Extract the URL
        Blocklist.objects.create(user=request.user, url=url)  # Save to the database
        return JsonResponse({'success': 'URL added to blocklist.'}, status=201)
    return JsonResponse({'error': 'Invalid request method.'}, status=405)

@login_required
def my_plants_api(request):
    plants = Plant.objects.filter(user=request.user).values('status', 'image', 'date', 'time')
    return JsonResponse(list(plants), safe=False)

@login_required
def my_allowlist_api(request):
    print(f"Fetching allowlist for user: {request.user}")  # Debugging line
    allowlist = Allowlist.objects.filter(user=request.user).values('url')
    print(f"Allowlist data: {list(allowlist)}")
    return JsonResponse(list(allowlist), safe=False)

@login_required
def my_blocklist_api(request):
    blocklist = Blocklist.objects.filter(user=request.user).values('url')
    return JsonResponse(list(blocklist), safe=False)

@login_required
def profile_settings(request):
    try:
        user = request.user
        if request.method == 'POST':
            form = ProfileUpdateForm(request.POST, request.FILES, instance=user)
            if form.is_valid():
                form.save()
                return redirect('dashboard')  # Redirect to the dashboard after saving
        else:
            form = ProfileUpdateForm(instance=user)

        # Render the profile settings template with user details
        return render(request, 'accounts/profile_settings.html', {'form': form, 'user': user})
    except Exception as e:
        print(f"Error in profile_settings view: {e}")
        return HttpResponseServerError("An error occurred while processing your request.")





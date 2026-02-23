import requests
import json
import time
import os
import sys

# API Key provided by the user
API_KEY = "f50eb6912be44b3a9c86a7b9309174c1"

# AssemblyAI API endpoints
UPLOAD_ENDPOINT = "https://api.assemblyai.com/v2/upload"
TRANSCRIPT_ENDPOINT = "https://api.assemblyai.com/v2/transcript"

headers = {
    "authorization": API_KEY,
    "content-type": "application/json"
}

def upload_file(file_path):
    """
    Uploads a local audio file to AssemblyAI.
    """
    if not os.path.exists(file_path):
        print(f"Error: File not found at {file_path}")
        return None

    def read_file(file_path, chunk_size=5242880):
        with open(file_path, 'rb') as _file:
            while True:
                data = _file.read(chunk_size)
                if not data:
                    break
                yield data

    print(f"Uploading {file_path}...")
    upload_response = requests.post(
        UPLOAD_ENDPOINT,
        headers=headers,
        data=read_file(file_path)
    )

    if upload_response.status_code == 200:
        return upload_response.json()['upload_url']
    else:
        print(f"Upload failed: {upload_response.status_code} - {upload_response.text}")
        return None

def transcribe_audio(audio_url):
    """
    Starts the transcription job for the given audio URL.
    """
    data = {
        "audio_url": audio_url,
        "language_code": "ar"
    }
    
    print("Starting transcription...")
    response = requests.post(TRANSCRIPT_ENDPOINT, json=data, headers=headers)
    
    if response.status_code == 200:
        return response.json()['id']
    else:
        print(f"Transcription request failed: {response.status_code} - {response.text}")
        return None

def get_transcript(transcript_id):
    """
    Polls the API until the transcription is ready.
    """
    polling_endpoint = f"{TRANSCRIPT_ENDPOINT}/{transcript_id}"
    
    while True:
        response = requests.get(polling_endpoint, headers=headers)
        
        if response.status_code == 200:
            status = response.json()['status']
            if status == 'completed':
                print("Transcription completed!")
                return response.json()
            elif status == 'error':
                print(f"Transcription failed: {response.json()['error']}")
                return None
            else:
                print(f"Status: {status}. Waiting 5 seconds...")
                time.sleep(5)
        else:
            print(f"Polling failed: {response.status_code} - {response.text}")
            return None

def save_to_json(data, filename):
    """
    Saves the transcription data to a JSON file.
    """
    try:
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)
        print(f"Transcription saved to {filename}")
    except Exception as e:
        print(f"Error saving to JSON: {e}")

if __name__ == "__main__":
    # Example usage:
    # python transcribe.py <path_to_audio_file>
    
    if len(sys.argv) < 2:
        print("Usage: python transcribe.py <path_to_audio_file>")
        sys.exit(1)
        
    audio_input = sys.argv[1]
    
    # Check if input is a URL or a local file
    if audio_input.startswith("http://") or audio_input.startswith("https://"):
        print(f"Using provided URL: {audio_input}")
        upload_url = audio_input
    else:
        # It's a local file, upload it
        upload_url = upload_file(audio_input)
    
    if upload_url:
        # 2. Transcribe
        transcript_id = transcribe_audio(upload_url)
        
        if transcript_id:
            # 3. Get Result
            result = get_transcript(transcript_id)
            
            if result:
                # 4. Save to JSON
                if audio_input.startswith("http"):
                    # Use a default name for URL inputs
                    output_filename = "url_transcript.json"
                else:
                    base_name = os.path.basename(audio_input)
                    file_name_without_ext = os.path.splitext(base_name)[0]
                    output_filename = f"{file_name_without_ext}_transcript.json"
                
                save_to_json(result, output_filename)
                
                # Print a snippet to the console so the user sees something immediately
                print("\n--- Transcription Snippet ---")
                print(result.get('text', '')[:200] + "...")
                print("-----------------------------")

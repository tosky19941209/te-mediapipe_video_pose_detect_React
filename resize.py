import cv2

# Open the video file
video_capture = cv2.VideoCapture('13.mp4')

# Define the new width and height
new_width = 1140
new_height = 780

# Create a VideoWriter object to save the resized video
fourcc = cv2.VideoWriter_fourcc(*'XVID')
output_video = cv2.VideoWriter('output_video.mp4', fourcc, 20.0, (new_width, new_height))

while True:
    ret, frame = video_capture.read()
    
    if not ret:
        break
    
    # Resize the frame
    resized_frame = cv2.resize(frame, (new_width, new_height))
    
    # Write the resized frame to the output video
    output_video.write(resized_frame)
    
    cv2.imshow('Resized Video', resized_frame)
    
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

video_capture.release()
output_video.release()
cv2.destroyAllWindows()

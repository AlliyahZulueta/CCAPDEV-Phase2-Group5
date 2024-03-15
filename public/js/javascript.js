window.addEventListener("load", function () {
    var textarea = document.getElementById("review-comment");
    textarea.focus(); // Set focus to the textarea
    textarea.setSelectionRange(0, 0); // Set cursor position to the start
});

const toggleLike = (element) => {
    const container = element.closest('.user-review-actions-1');
    const likebtn = container.querySelector(".like");
    const likeCount = container.querySelector(".like-counter");
    const dislikebtn = container.querySelector(".dislike");
    const dislikeCount = container.querySelector(".thumbsdown-counter");

    // Check the source of the like button image
    const likeImgSrc = likebtn.getAttribute("src");
    // console.log(likeImgSrc); debugging 
    if (likeImgSrc.includes("image/althea/like.png")) {
        
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
        likebtn.setAttribute("src", "image/althea/blue-like.png");

        if (dislikebtn.getAttribute("src").endsWith("thumbsdown-red.png")) {
            dislikeCount.textContent = parseInt(dislikeCount.textContent) - 1;
            dislikebtn.setAttribute("src", "image/althea/thumbsdown.png");
        }
    } else {
        likeCount.textContent = parseInt(likeCount.textContent) - 1;
        likebtn.setAttribute("src", "image/althea/like.png");
    }
};

const toggleDislike = (element) => {
    const container = element.closest('.user-review-actions-1');
    const dislikebtn = container.querySelector(".dislike");
    const dislikeCount = container.querySelector(".thumbsdown-counter");
    const likebtn = container.querySelector(".like");
    const likeCount = container.querySelector(".like-counter");

    if (dislikebtn.src.endsWith("thumbsdown.png")) {
        dislikeCount.textContent = parseInt(dislikeCount.textContent) + 1;
        dislikebtn.src = "image/althea/thumbsdown-red.png";

        if (likebtn.src.endsWith("blue-like.png")) {
            likeCount.textContent = parseInt(likeCount.textContent) - 1;
            likebtn.src = "image/althea/like.png";
        }
    } else {
        dislikeCount.textContent = parseInt(dislikeCount.textContent) - 1;
        dislikebtn.src = "image/althea/thumbsdown.png";
    }
};

const reportReview = (element) => {
    const container = element.closest('.user-review-actions-1');
    console.log("working report");
    // You can also display a message to the user confirming that the review has been reported
    alert('Review has been reported successfully!');
};
  
const editReview = (element) => {
    const reviewContainer = element.closest('.review-1');
    const commentElement = reviewContainer.querySelector('.comment');
    const titleElement = reviewContainer.querySelector('.user-review-title-1');

    // Get the current values
    const currentComment = commentElement.textContent;
    const currentTitle = titleElement.textContent;

    // Switch to edit mode
    commentElement.innerHTML = `<textarea class="edit-comment">${currentComment}</textarea>`;
    titleElement.innerHTML = `<input type="text" class="edit-title" value="${currentTitle}">`;

    // Create a save button
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save Edit';
    saveButton.classList.add('save-btn');
    saveButton.addEventListener('click', () => {

      // Confirm with the user if they want to continue with the edit
      const confirmEdit = confirm('Are you sure you want to save the changes?');
      if (confirmEdit) {
        // Get the updated values
        const updatedComment = commentElement.querySelector('.edit-comment').value;
        const updatedTitle = titleElement.querySelector('.edit-title').value;

        if (updatedComment.trim() === '' || updatedTitle.trim() === '') {
          // Alert the user and do not save if either is empty
          alert("Comment and title cannot be empty!");
          return;
        }

        // Update the review with the new information
        commentElement.innerHTML = updatedComment;
        titleElement.innerHTML = updatedTitle;

      } else {
          // Cancel the edit and revert back to the original values
          commentElement.innerHTML = currentComment;
          titleElement.innerHTML = currentTitle;
      }
      // Remove the save button
      reviewContainer.removeChild(saveButton);
    });
    // Append the save button
    reviewContainer.appendChild(saveButton);
};

const deleteReview = (element) => {
    // Ask the user for confirmation
    const confirmation = confirm("Are you sure you want to delete this review?");

    // If the user confirms, proceed with deletion
    if (confirmation) {
        const container = element.closest('.user-review-actions-1');
        const parentContainer = container.parentElement; //review-1
        const grandParentContainer = parentContainer.parentElement; //review-parent-container
        const greatGrandParentContainer = grandParentContainer.parentElement; //review-container
        
        greatGrandParentContainer.removeChild(grandParentContainer);

        var countRateElement = document.querySelector('.countRate');
        var countRate = parseInt(countRateElement.textContent);
        countRateElement.textContent = countRate - 1;
    } else {
        // Optionally, you can provide feedback to the user that the deletion was canceled.
        alert("Deletion canceled.");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    function validateForm() {
        const title = document.getElementById("review-title").value.trim();
        const comment = document.getElementById("review-comment").value.trim();
        const rating = getSelectedRating();

        if (title === "") {
            alert("Please enter a title for your review.");
            return false;
        }

        if (comment === "") {
            alert("Please enter a comment for your review.");
            return false;
        }

        if (!rating) {
            alert("Please select a rating for your review.");
            return false;
        }

        return true;
    }

    function hideEmptyImages() {
        const imageContainers = document.querySelectorAll('.user-review-image-1');

        imageContainers.forEach(container => {
            const img = container.querySelector('img');
            const src = img ? img.getAttribute('src') : '';
            if (!src || src.startsWith('http://') || src.startsWith('https://')) {
                container.style.display = 'none';
            } else {
                container.style.display = 'flex'; // Show the container if there's an image with a relative source
            }
        });
    }

    let noOfCharac = 150;
    let contents = document.querySelectorAll(".comment");

    function sliceComments() {
        const contents = document.querySelectorAll(".user-review-comment-1");
        contents.forEach(container => {
            let comment = container.querySelector(".comment");
            let button = container.querySelector(".show-more-btn"); // Get the button inside the container
    
            if (!comment || !button) {
                console.error("Comment or button not found within container:", container);
                return; // Exit the loop if comment or button is not found
            }
    
            let commentText = comment.textContent.trim(); // Remove leading and trailing white spaces
            if (commentText.length < noOfCharac) {
                console.log("Comment length is less than noOfCharac");
                console.log(commentText.length);
                button.style.display = "none"; // Hide the button
                container.style.height = "auto"; // Adjust container height
            } else {
                console.log("Comment length is greater than or equal to noOfCharac");
                console.log(commentText.length);
                let displayText = commentText.slice(0, noOfCharac);
                let moreText = commentText.slice(noOfCharac);
                comment.innerHTML = `${displayText}<span class="hide more">${moreText}</span>`;
            }
        });
    }
    
    // Call sliceComments function when the DOM is loaded
    sliceComments();

    function applyNewShowMoreListeners() {
        console.log("working");
        const reviewContainer = document.querySelector(".review-container");
        const newShowMoreBtns = reviewContainer.querySelectorAll(".show-more-btn:not(.listener-added)");

        newShowMoreBtns.forEach(btn => {
            btn.classList.add("listener-added"); // Mark button as having the listener added
            btn.addEventListener("click", function() {
                readMore(this);
            }); // Add event listener
        });
    }

    function readMore(btn) {
        let user_review_comment_1 = btn.parentElement;
        let review_container = user_review_comment_1.parentElement;
        let more = user_review_comment_1.querySelector(".more");

        if (more) {
            more.classList.toggle("hide");

            if (btn.textContent == "Show more...") {
                btn.textContent = "Show less...";
                review_container.style.height = "auto";
            } else {
                btn.textContent = "Show more...";
                review_container.style.height = "auto";
            }
        }
    }

    const publishBtn = document.getElementById("submitBtn");

    function getCurrentDate() {
        const currentDate = new Date();
        return currentDate.toLocaleDateString();
    }

    function getSelectedRating() {
        const selectedRating = document.querySelector("input[name='rate']:checked");
        return selectedRating ? selectedRating.value : null;
    }

    function generateStarRating(rating) {
        const stars = parseInt(rating);
        let starIcons = '';
        for (let i = 0; i < stars; i++) {
        starIcons += '<img src="image/althea/star.png" alt="star" class="stars-img">&nbsp;&nbsp;&nbsp;';
        }
        return starIcons;
    }

    function resetFileInputs() {
        // Reset image file input
        document.getElementById("default-Btn").value = "";
        // Reset video file input
        document.getElementById("video-file").value = "";

        document.getElementById('file-name').textContent = "";
    }

    publishBtn.addEventListener("click", function() {
        console.log("Submit button clicked!"); //debugging

        if (!validateForm()) {
         return; // Stop execution if form is not valid
        }

        const title = document.getElementById("review-title").value;
        const comment = document.getElementById("review-comment").value;
        const rating = getSelectedRating();
        const date = getCurrentDate();
        const image = document.getElementById("preview-image").src;

        const videoFile = document.getElementById("video-file").files[0];
        let videoURL = null;

        let videoContainerHTML = ''; // Store HTML for video container
        if (videoFile) {
            videoURL = URL.createObjectURL(videoFile);
            // Generate HTML for video container
            videoContainerHTML = `
                <div class="user-review-video-1">
                    <video controls>
                        <source src="${videoURL}" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
                `;
        }

        // Create HTML elements for the new review
        const newReview = document.createElement("div");
        const newParentReviewContainer = document.createElement("div");
        newReview.classList.add("review-1");

        newReview.innerHTML = `
            <div class="user-review-header-1">
                <img src="image/althea/profile.png" alt="profile" class="profile-img">
                <span class="username-1">Alliyah Zulueta</span>
                
                <div class="star-container">
                <span class="stars-img"> ${generateStarRating(rating)}</span> 
                </div>
                
                <span class="date">${date}</span>
            </div>

            <div class="user-review-title-1">
                ${title}
            </div>

            <div class="user-review-comment-1">
                <p class="comment">${comment}</p>
                <button class="show-more-btn">Show more...</button>
            </div>

            <div class="user-review-image-1">
                <img src="${image}" alt="">
            </div>

            ${videoContainerHTML}

            <div class="user-review-actions-1">
                <img src="image/althea/like.png" alt="" class="like" onclick="toggleLike(this)">
                <h1 class="like-counter">0</h1>
                <img src="image/althea/thumbsdown.png" alt="" class="dislike" onclick="toggleDislike(this)">
                <h1 class="thumbsdown-counter">0</h1>
                <img src="image/althea/report.png" alt="" class="report" onclick="reportReview(this)">

                <div class="actions-left">
                <img src="image/althea/edit.png" alt="" class="edit" onclick="editReview(this)">
                <img src="image/althea/trash.png" alt="" class="delete" onclick="deleteReview(this)">
                </div>
            </div>
        `;

        const newComment = document.createElement("div");
        newComment.classList.add("make-comments-container");
        newComment.innerHTML = `
            <div class="comment-input-container">
                <textarea id="commentInput" rows="4" cols="50" placeholder="Write your comment here..."></textarea>
                <button id="postCommentBtn">Post Comment</button>
            </div>
        `;

        // Increment the countRate by 1
        var countRateElement = document.querySelector('.countRate');
        var countRate = parseInt(countRateElement.textContent);
        countRateElement.textContent = countRate + 1;

        // Append the new review to the review container
        const reviewContainer = document.querySelector(".review-container");
        reviewContainer.appendChild(newParentReviewContainer);
        newParentReviewContainer.appendChild(newReview);
        newParentReviewContainer.appendChild(newComment);

        
        
        console.log(image);
        
        hideEmptyImages();    

        //reset img container
        document.getElementById("preview-image").src = "";
        imageContainer.classList.remove("active");
        document.getElementById("upload-image").style.display = "inline";
        document.querySelector(".image-text").style.display = "block";
        // Reset form fields
        document.getElementById("review-title").value = "";
        document.getElementById("review-comment").value = "";
        document.getElementById("preview-image").src = "";
        // Clear rating selection (if needed)
        const selectedRating = document.querySelector("input[name='rate']:checked");
        if (selectedRating) {
            selectedRating.checked = false;
        }
        sliceComments();
        applyNewShowMoreListeners();
        resetFileInputs();
    });


    // Function to fetch review data from the server and populate the review containers
    applyNewShowMoreListeners();
    hideEmptyImages();


});
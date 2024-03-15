
let cardIds = [
    'reviews-card1', 'reviews-card2', 'reviews-card3',
    'comments-card1', 'comments-card2', 'comments-card3'
];

let newTexts = [
    "Weclean is fantastic! My clothes have never been so clean and fresh. The staff is friendly and efficient.",
    "A lifesaver! Quick and reliable service, especially in urgent situations.",
    "7Folds Laundry provides excellent service! My clothes always come back neatly folded and smelling fresh.",
    "Baby, you should try Weclean! They really know how to handle your laundry well.",
    "Baby, next time you're in a rush, Nonstop Laundry in Malate is the place to go.",
    "Baby, try 7Folds Laundry next time. Your clothes will thank you for it!"
];

let middleClassNameNoOfChar = 38;
let storeClassNameNoOfChar = 15;

function truncateText() {
    cardIds.forEach(function(cardId) {
        const element = document.getElementById(cardId);
        if (element && !isInsidePopupContent(element)) {
            const middleClassName = `.${cardId}-middle`;
            const storeClassName = `.${cardId}-store`;
            const isInsidePopup = isInsidePopupContent(element);
            truncateElements(middleClassName, middleClassNameNoOfChar, !isInsidePopup);
            truncateElements(storeClassName, storeClassNameNoOfChar, !isInsidePopup);
        }
    });
}

function truncateElements(selector, maxChars, truncate) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(function (element) {
        if (!isInsidePopupContent(element) && truncate) {
            let textContent = element.textContent.trim();
            if (textContent.length > maxChars) {
                element.textContent = textContent.substring(0, maxChars) + '...';
            }
        }
    });
}

function isInsidePopupContent(element) {
    return element.closest('.popup-review-comment-container') !== null;
}

function replaceTextWithCompleteStrings(typeStr, cardId) {
    // typeStr could be either "reviews-card1" or 'comments-card1'
    const userInfoBottomReviews = document.querySelectorAll(`.user-info-bottom .${typeStr}-middle`);
    const userInfoBottomComments = document.querySelectorAll(`.user-info-bottom .${typeStr}-middle`);
    const userInfoBottomReviewsArr = Array.from(userInfoBottomReviews);
    const userInfoBottomCommentsArr = Array.from(userInfoBottomComments);

    const reviewsCardMiddleElements = document.querySelectorAll(`.popup-review-comment-container .${typeStr}-middle`);
    const commentsCardMiddleElements = document.querySelectorAll(`.popup-review-comment-container #${cardId} .${typeStr}-middle`);
    const reviewsCardMiddleElementsArray = Array.from(reviewsCardMiddleElements);
    const commentsCardMiddleElementsArray = Array.from(commentsCardMiddleElements);

    let indexCount = 0;

    console.log(userInfoBottomReviewsArr.length);
    console.log(userInfoBottomCommentsArr.length);

    console.log(reviewsCardMiddleElementsArray.length);
    console.log(commentsCardMiddleElementsArray.length);

    if (commentsCardMiddleElementsArray.length > 0) {
        if (cardId === "comments-card1") {
            indexCount = 3;
        } else if (cardId === "comments-card2") {
            indexCount = 4;
        } else if (cardId === "comments-card3") {
            indexCount = 5;
        }
        let searchDOMPopUpCard = document.querySelector(`.popup-review-comment-container #${cardId} .${typeStr}-middle`);
        commentsCardSetText(searchDOMPopUpCard, indexCount);
    }

    if (reviewsCardMiddleElementsArray.length > 0) {
        if (cardId === "reviews-card1") {
            indexCount = 0;
        } else if (cardId === "reviews-card2") {
            indexCount = 1;
        } else if (cardId === "reviews-card3") {
            indexCount = 2;
        }
        let searchDOMPopUpCard = document.querySelector(`.popup-review-comment-container #${cardId} .${typeStr}-middle`);
        reviewCardSetText(searchDOMPopUpCard, indexCount);
    }
}
function reviewCardSetText(element, indexCount) {
    if (indexCount === 0) {
        element.textContent = newTexts[0];
    } else if (indexCount === 1) {
        element.textContent = newTexts[1];
    } else if (indexCount === 2) {
        element.textContent = newTexts[2];
    }
}
function commentsCardSetText(element, indexCount) {
    if (indexCount === 3) {
        element.textContent = newTexts[3];
    } else if (indexCount === 4) {
        element.textContent = newTexts[4];
    } else if (indexCount === 5) {
        element.textContent = newTexts[5];
    }
}
function setupPopupOnClick(cardContainerSelector, cardSelector) {
        const cardContainers = document.querySelectorAll(cardSelector);
        hidePopup();
        cardContainers.forEach(function (cardContainer) {
            cardContainer.addEventListener('click', showPopup);
        });
    }
    function hidePopup() {
        const popupContainer = document.querySelector('.popup-review-comment-container');
        const containerBottom = document.querySelector('.container-bottom');
        popupContainer.style.display = 'none';
        containerBottom.innerHTML = '';
    }

    function showPopup() {
        const popupContainer = document.querySelector('.popup-review-comment-container');
        const popupContent = document.querySelector('.popup-content');

        popupContainer.style.display = 'flex';
        popupContainer.style.position = 'fixed';
        popupContainer.style.top = '250px';
        popupContainer.style.left = '0';
        popupContainer.style.width = '100vw';
        popupContainer.style.height = '50vh';
        popupContainer.style.justifyContent = 'center';
        popupContainer.style.alignItems = 'center';
        popupContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)'; 

        popupContent.style.backgroundColor = 'white';
        popupContent.style.padding = '5px';
        popupContent.style.borderRadius = '8px';
        popupContent.style.border = '1px solid black';
        popupContent.style.height = '40%';
        popupContent.style.width = '50%';
    }

    function displayCardContent(cardId) {
        const cardContent = document.getElementById(cardId).cloneNode(true);
        const containerBottom = document.querySelector('.container-bottom');
        if (cardId.includes('reviews-card1') || cardId.includes('comments-card1') ||
            cardId.includes('reviews-card2') || cardId.includes('comments-card2') ||
            cardId.includes('reviews-card3') || cardId.includes('comments-card3')) {
            cardContent.style.height = '120px';
            cardContent.style.width = '95%';
            cardContent.style.padding = '3px';
        }

        const cardMiddle = containerBottom.querySelector('.reviews-card1-middle, .comments-card1-middle');
        if (cardMiddle) {
            cardMiddle.style.height = '200px';
        }

        containerBottom.innerHTML = ' ';
        containerBottom.appendChild(cardContent);

        showPopup();

        setupImageClickHandler(cardId,'.popup-review-comment-container #reviews-card1',     '.img_like', 'image/like_fill.png', 'image/like.png');
        setupImageClickHandler(cardId,'.popup-review-comment-container #reviews-card1',     '.img_dislike',  'image/dislike_fill.png', 'image/dislike.png');
        setupImageClickHandler(cardId,'.popup-review-comment-container #comments-card1',    '.img_like', 'image/like_fill.png', 'image/like.png');
        setupImageClickHandler(cardId,'.popup-review-comment-container #comments-card1',    '.img_dislike',  'image/dislike_fill.png', 'image/dislike.png');
        setupImageClickHandler(cardId,'.popup-review-comment-container #reviews-card2',     '.img_like', 'image/like_fill.png', 'image/like.png');
        setupImageClickHandler(cardId,'.popup-review-comment-container #reviews-card2',     '.img_dislike',  'image/dislike_fill.png', 'image/dislike.png');

        setupImageClickHandler(cardId,'.popup-review-comment-container  #comments-card2',   '.img_like', 'image/like_fill.png', 'image/like.png');
        setupImageClickHandler(cardId,'.popup-review-comment-container  #comments-card2',   '.img_dislike',  'image/dislike_fill.png', 'image/dislike.png');
        setupImageClickHandler(cardId,'.popup-review-comment-container  #reviews-card3',    '.img_like', 'image/like_fill.png', 'image/like.png');
        setupImageClickHandler(cardId,'.popup-review-comment-container  #reviews-card3',    '.img_dislike',  'image/dislike_fill.png', 'image/dislike.png');
        setupImageClickHandler(cardId,'.popup-review-comment-container  #comments-card3',   '.img_like', 'image/like_fill.png', 'image/like.png');
        setupImageClickHandler(cardId,'.popup-review-comment-container  #comments-card3',   '.img_dislike',  'image/dislike_fill.png', 'image/dislike.png');

        if (cardContent.querySelector('.reviews-card1') !== undefined) {
            let typeStr = "reviews-card1";
            replaceTextWithCompleteStrings(typeStr, cardId);
        }
        if (cardContent.querySelector('.comments-card1') !== undefined) {
            let typeStr = "comments-card1";
            replaceTextWithCompleteStrings(typeStr, cardId);
        }
        commentCardGenerator(cardId);
    }

function setupImageClickHandler(cardId, containerSelector, imgSelector, unfillImagePath, filledImagePath) {
    const containerElements = document.querySelectorAll(containerSelector);

    containerElements.forEach(function(containerElement) {
        const imgElement = containerElement.querySelector(imgSelector);

        if (imgElement) {
            let isClick = false;

            imgElement.addEventListener('click', function () {
                if (isClick) {
                    imgElement.src = filledImagePath;
                } else {
                    imgElement.src = unfillImagePath;
                }
                isClick = !isClick;


                const numLikesElement = containerElement.querySelector('.num-likes');
                const numDislikesElement = containerElement.querySelector('.num-dislikes');

                if (isClick) {
                    if (imgElement.classList.contains('img_like')) {
                        numLikesElement.textContent = parseInt(numLikesElement.textContent) + 1;
                    } else if (imgElement.classList.contains('img_dislike')) {
                        numDislikesElement.textContent = parseInt(numDislikesElement.textContent) + 1;
                    }

                } else {
                    if (imgElement.classList.contains('img_like')) {
                        numLikesElement.textContent = parseInt(numLikesElement.textContent) -  1;
                    } else if (imgElement.classList.contains('img_dislike')) {
                        numDislikesElement.textContent = parseInt(numDislikesElement.textContent) - 1;
                    }
                }
                const cardSelector = getCardSelector(cardId);
                updateProfileCardInner(cardSelector, numLikesElement.textContent, numDislikesElement.textContent);
            });
        }
    });
}
function commentCardGenerator(cardId) {
    const commentContainerSelector = document.querySelector('.popup-content #' + cardId + ' .img_comment');

    commentContainerSelector.addEventListener('click', function () {
        let comment = cardId.querySelector('.comment_section');

        if (!comment) {
            let popupContent = cardId.querySelector('.popup-content .container-bottom');
            let commentSection = createCommentSection();
            popupContent.appendChild(commentSection);
            console.log("Comment clicked working");
        }

        //CONTINUE COMMENT LOGIC
    });
}


// Assuming createCommentSection and post_comment functions are defined as before
function createCommentSection() {
    let commentSection = document.createElement('div');
    commentSection.className = 'comment_section';

    let commentFeed = document.createElement('div');
    commentFeed.className = 'comment_feed';
    commentSection.appendChild(commentFeed);

    let centerAlign = document.createElement('span');
    centerAlign.className = 'center_align width_100';

    let createCommentDiv = document.createElement('div');
    createCommentDiv.className = 'create_comment';

    let commentForm = document.createElement('form');
    commentForm.id = 'create_comment_form';

    let textarea = document.createElement('textarea');
    textarea.placeholder = 'Write a comment...';
    textarea.id = 'create_comment_input';
    textarea.name = 'create_comment_input';

    let postButton = document.createElement('input');
    postButton.type = 'button';
    postButton.value = 'post';
    postButton.id = 'create_comment_button';
    postButton.onclick = function () {
        post_comment(this.parentNode.parentNode.parentNode.parentNode);
    };

    commentForm.appendChild(textarea);
    commentForm.appendChild(postButton);
    createCommentDiv.appendChild(commentForm);
    centerAlign.appendChild(createCommentDiv);
    commentSection.appendChild(centerAlign);

    return commentSection;
}

function post_comment(post){

}

function getCardSelector(cardId) {
        return `.profile-card-inner .user-info-bottom #${cardId}`;
}


function updateProfileCardInner(containerSelector, numLikes, numDislikes) {
    const profileCard = document.querySelector(containerSelector);

    if (profileCard) {
        const profileCardInnerNumLikes = profileCard.querySelector('.num-likes');
        const profileCardInnerNumDislikes = profileCard.querySelector('.num-dislikes');

        if (profileCardInnerNumLikes && profileCardInnerNumDislikes) {
            profileCardInnerNumLikes.textContent = numLikes;
            profileCardInnerNumDislikes.textContent = numDislikes;
        }
    }
}

    function setupCardClickListeners() {
        cardIds.forEach(function (cardId) {
            const cardElement = document.getElementById(cardId);

            if (cardElement) {
                cardElement.addEventListener('click', function () {
                    displayCardContent(cardId);
                });
            }
        });
    }

function render_comments(post){
    var comment = document.querySelector(' post + .comment_section');
    if(comment.style.display ==="flex"){
        comment.style.display= "none";
    }else{
        comment.style.display="flex";
        comment.style.flexDirection = "column";
        comment.style.alignItems = "flex-end";
    }
}


    document.addEventListener("DOMContentLoaded", function () {
        truncateText();
        hidePopup();
        setupCardClickListeners();
        setupPopupOnClick('.profile-card', '.reviews-card1');
        setupPopupOnClick('.profile-card', '.comments-card1');
        commentCardGenerator();
    });


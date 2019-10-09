'use strict';

/** comments: change timestamps to comment links */
const addCommentLinks = () =>
    document
        .querySelectorAll('.section-comments .item > .story-content > .story-footer > .details-date')
        .forEach((element) => {
            let link = document.createElement('a');
            link.style.border = '1px dotted blue';

            let commentTime = new Date(element.querySelector('time').getAttribute('datetime'));
            let urlTime = encodeURI(commentTime.toISOString().replace('T', ' '));

            let top = element
                .parentElement
                .parentElement
                .parentElement
                .parentElement
                .parentElement
                .parentElement
                .parentElement;

            let href = '?startTime=' + urlTime;
            if (top.classList.value === 'post story') {
                // timeline post
                let detailLink = top.querySelector('.story-content > a.details-date');
                let postId = detailLink.href.split('/').slice(-1)[0];

                href = detailLink.href + href + '#snippet-post-comments-p' + postId + '-comments';
            } else {
                // blog post
                href += '#snippet-comments-comments';
            }

            link.href = href;

            element.parentNode.insertBefore(link, element);
            link.appendChild(element);
        });

/** "Výběr z blogů": if the author's profile image is used as post preview image, hide it */
const digestMaskProfilePhotos = () =>
    document
        .querySelectorAll('body > .site > .section-content > .row > .col:nth-child(2) > .panel-container:nth-child(1) > h3:nth-child(3) + .box-row > .box')
        .forEach((element) => {
            let img = element.querySelector('img');
            if (img.src.includes('https://img.signaly.cz/profile-photos/')) {
                img.style.display = 'none';
                img.parentElement.parentElement.style.backgroundColor = 'grey';
            }
        });


addCommentLinks();
// TODO this is really dirty - it would be much better to somehow listen for the new comments being added to the page
setInterval(addCommentLinks, 4000);

digestMaskProfilePhotos();
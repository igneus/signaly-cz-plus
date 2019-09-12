'use strict';

const addCommentLinks = () =>
    document
        .querySelectorAll('.section-comments .item > .story-content > .story-footer > .details-date')
        .forEach(function (element) {
            let link = document.createElement('a');
            link.style.border = '1px dotted blue';

            let commentTime = new Date(element.querySelector('time').getAttribute('datetime'));
            let urlTime = encodeURI(commentTime.toISOString().replace('T', ' '));

            let href = '?startTime=' + urlTime;

            let top = element
                .parentElement
                .parentElement
                .parentElement
                .parentElement
                .parentElement
                .parentElement
                .parentElement;
            console.log(top);
            if (top.classList.value === 'post story') {
                // timeline post
                let detailLink = top.querySelector('.story-content > a.details-date');
                console.log(detailLink);
                let postId = detailLink.href.split('/').slice(-1)[0];
                console.log(postId);
                href = detailLink.href + href + '#snippet-post-comments-p' + postId + '-comments';
            } else {
                // blog post
                href += '#snippet-comments-comments';
            }

            link.href = href;

            element.parentNode.insertBefore(link, element);
            link.appendChild(element);
        });

addCommentLinks();

// TODO this is really dirty - it would be much better to somehow listen for the new comments being added to the page
setInterval(addCommentLinks, 4000);

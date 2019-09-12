'use strict';

const addCommentLinks = () =>
    document
        .querySelectorAll('.section-comments .item > .story-content > .story-footer > .details-date')
        .forEach(function (element) {
            let link = document.createElement('a');
            link.style.border = '1px dotted blue';

            let commentTime = new Date(element.querySelector('time').getAttribute('datetime'));
            let urlTime = encodeURI(commentTime.toISOString().replace('T', ' '));

            // TODO: for timeline posts determine post URL
            link.href = '?startTime=' + urlTime + '#snippet-comments-comments';

            element.parentNode.insertBefore(link, element);
            link.appendChild(element);
        });

addCommentLinks();

// TODO this is really dirty - it would be much better to somehow listen for the new comments being added to the page
setInterval(addCommentLinks, 4000);

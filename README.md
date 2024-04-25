# Django EPUB Editor

A django app for viewing and editing [EPUB 3](https://www.w3.org/TR/epub-33/) files.
Focus is on media overlays. For everything else, there are better tools out there.

## Key points

* Upload EPUBs (only EPUB 3 allowed)
* Display book contents (no support for style overrides)
* Play media overlays by click

In progress:

* Change media overlay timings
* Edit XHTML directly
* Automatic alignment of text and audio
* Read along functionality and extended playback options if I ever feel the need

## Deployment

### Requirements

* Python 3.12+
* nginx
* epubcheck
* firejail
* Django 5
* for deployment also Gunicorn and a database (PostgreSQL)

When self-hosting, update the text inside `templates/epubeditor/base.html`. I disabled logging
but if your server configuration is different, this should be written down somewhere. Of course, you are not allowed to change the license.

## Technical Rationale

Essentially, I just want a way to read ebooks with embedded narration (*media overlay*). And when I find an error, especially with mistimed media overlay timestamps, I want to quickly correct them without changing apps or devices.

Now the problem is that you have to choose between EPUB viewers ([Thorium Reader](https://www.edrlab.org/software/thorium-reader/)) and EPUB editors ([Sigil](https://sigil-ebook.com/)). Another problem is that the support for media overlays is terrible. Even apps with support do weird stuff like omitting pauses between sentences when playing the audio backing track. And the latter point is something I could not compromise on.

As for the GUI, I would prefer a native application. But EPUB is essentially just a zip file with a website inside. So even when using a native GUI toolkit, I would need to embed a whole Chromium browser. It is much more open and straightforward to simply serve the EPUB content as it is and use the browser of choice (I prefer Firefox).

Since I do not plan on having many users and I also want to minimize dependencies, I chose a monolithic approach: The Python framework [Django](https://www.djangoproject.com/). It also handles all the authentication stuff which is not really interesting to implement by oneself. At first, I thought I could do everything in JavaScript without the need for a backend, but playing around with different algorithms for speech recognition is much easier without all the browser restrictions. And Python is the de facto standard for prototyping machine learning stuff.

As for the frontend... Unfortunately, I use a complicated build pipeline based on [Rollup](https://rollupjs.org/). Specifically, I use [Lit](https://lit.dev/) for web components since it is easy to just put an EPUB's HTML inside the Shadow DOM of a Lit/Web Component. In practice, it got much more complicated than I initially thought. Now I have a bunch of JavaScript dependencies I never wished for. Well, at least this allows for polyfills if I ever wish to think about browser compatibility.

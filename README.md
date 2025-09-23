# Django EPUB Editor

A django app for viewing and editing [EPUB 3](https://www.w3.org/TR/epub-33/) files.
Focus is on media overlays. For everything else, there are better tools out there.

## Goals

* Be a mediocre EPUB viewer
* Be a mediocre EPUB editor
* Focus on media overlays

It is only possible to upload valid EPUB 3 files. Editing files should always result in valid EPUB 3 files. It should be impossible to create invalid EPUB 3.

## Deployment

Either run this locally using the Django development server with SQLite or do a full production deployment.

### Requirements

* Python 3.12+ (because I want to use `Path.walk` fron [pathlib](https://docs.python.org/3.12/library/pathlib.html#pathlib.Path.walk))
* Django 5
* Java 1.8 (for `epubcheck-server.jar` which I just put into the repo)

When self-hosting, update the text inside `templates/epubeditor/about.html`. I disabled logging
but if your server configuration is different, this should be written down somewhere. Of course, you are not allowed to change the license.

When uploading EPUBs, they are first checked against the official [epubcheck](https://github.com/w3c/epubcheck/) tool. You need to start this first by either `java -jar epubcheck-server.jar` or by `python manage.py runepubcheck`.

## Technical Rationale

Essentially, I just want a way to read ebooks with embedded narration (*media overlay*). And when I find an error, especially with mistimed media overlay timestamps, I want to quickly correct them without changing apps or devices.

Now the problem is that you have to choose between EPUB viewers ([Thorium Reader](https://www.edrlab.org/software/thorium-reader/)) and EPUB editors ([Sigil](https://sigil-ebook.com/)). Another problem is that the support for media overlays is terrible. Even apps with support do weird stuff like omitting pauses between sentences when playing the audio backing track. And the latter point is something I could not compromise on.

As for the GUI, I would prefer a native application. But EPUB is essentially just a zip file with a website inside. So even when using a native GUI toolkit, I would need to embed a whole Chromium browser. It is much more open and straightforward to simply serve the EPUB content as it is and use the browser of choice (I prefer Firefox).

Since I do not plan on having many users and I also want to minimize dependencies, I chose a monolithic approach: The Python framework [Django](https://www.djangoproject.com/). It also handles all the authentication stuff which is not really interesting to implement by oneself. At first, I thought I could do everything in JavaScript without the need for a backend, but playing around with different algorithms for speech recognition is much easier without all the browser restrictions. And Python is the de facto standard for prototyping machine learning stuff.

As for the frontend... Unfortunately, I use a complicated build pipeline based on [Rollup](https://rollupjs.org/). Specifically, I use [Lit](https://lit.dev/) for web components since it is easy to just put an EPUB's HTML inside the Shadow DOM of a Lit/Web Component. In practice, it got much more complicated than I initially thought. Now I have a bunch of JavaScript dependencies I never wished for. Well, at least this allows for polyfills if I ever wish to think about browser compatibility.

## TODO

Since there are long-running tasks, some adjustments will be of advantage:

* use background workers ([DEP-14](https://github.com/django/deps/blob/main/accepted/0014-background-workers.rst)) when they are available
* I'd like to have some general structure for experimenting with alignments
* is it possible to remove all the npm dependencies and just use vanilla js?
* get rid of epubcheck and the Java dependencies

Note: For the moment, I would like to avoid websockets.

Note 2: There is also an additional variable for writing out detailed diffs when editing around. This is more for debugging, but it is:

```python
# put into settings.py
SERIALIZE_PAYLOADS = True
```
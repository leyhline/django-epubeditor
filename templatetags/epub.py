from django import template

register = template.Library()

CORE_MEDIA_TYPES_TO_ICON_NAME = {
    "image/gif": "file-earmark-image",
    "image/jpeg": "file-earmark-image",
    "image/png": "file-earmark-image",
    "image/svg+xml": "file-earmark-image",
    "image/webp": "file-earmark-image",
    "audio/mpeg": "file-earmark-play",
    "audio/mp4": "file-earmark-play",
    "audio/ogg; codecs=opus": "file-earmark-play",
    "text/css": "file-earmark-break",
    "font/ttf": "file-earmark-font",
    "application/font-sfnt": "file-earmark-font",
    "font/otf": "file-earmark-font",
    "application/vnd.ms-opentype": "file-earmark-font",
    "font/woff": "file-earmark-font",
    "application/font-woff": "file-earmark-font",
    "font/woff2": "file-earmark-font",
    "application/xhtml+xml": "file-earmark-text",
    "application/smil+xml": "file-earmark-ruled",
}


@register.filter
def icon_name(attributes: dict[str, str]) -> str:
    """
    Return a font awesome icon name for the EPUB 3 core media types.
    The attributes dictionary must contain the media-type key.
    """
    media_type = attributes.get("media-type")
    return CORE_MEDIA_TYPES_TO_ICON_NAME.get(media_type, "file-earmark")

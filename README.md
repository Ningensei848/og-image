[![The service supports not only markdown, but also Emoticon and KaTeX](https://custom-og-image-generator.vercel.app/api/This%20%60App%60%20supports%20not%20only%20**Markdown**%2C%20_but%20also_%3Cbr%20%2F%3E**Emoji**%20%F0%9F%8E%89%F0%9F%8E%8A%F0%9F%8D%BE%F0%9F%A5%B3%20_and_%3Cbr%20%2F%3E%20%24%5CKaTeX%24.png?theme=light&timestamp=&title=This+%60App%60+supports+not+only+**Markdown**%2C+_but+also_%3Cbr+%2F%3E**Emoji**+%F0%9F%8E%89%F0%9F%8E%8A%F0%9F%8D%BE%F0%9F%A5%B3+_and_%3Cbr+%2F%3E+%24%5CKaTeX%24&logo=https%3A%2F%2Fgithub.githubassets.com%2Fimages%2Fmona-loading-default-static.svg&aka=%40octocat&site=Ningensei848%2Fog-image)](https://custom-og-image-generator.vercel.app/)

# [Open Graph Image as a Service](https://custom-og-image-generator.vercel.app/)

<a href="https://twitter.com/vercel">
    <img align="right" src="https://og-image.vercel.app/tweet.png" height="300" />
</a>

Serverless service that generates dynamic Open Graph images that you can embed in your `<meta>` tags.

For each keystroke, headless chromium is used to render an HTML page and take a screenshot of the result which gets cached.

See the image embedded in the tweet for a real use case.

## What is an Open Graph Image?

Have you ever posted a hyperlink to Twitter, Facebook, or Slack and seen an image popup?
How did your social network know how to "unfurl" the URL and get an image?
The answer is in your `<head>`.

The [Open Graph protocol](http://ogp.me) says you can put a `<meta>` tag in the `<head>` of a webpage to define this image.

It looks like the following:

```html
<head>
  <title>Title</title>
  <meta property="og:image" content="http://example.com/logo.jpg" />
</head>
```

## Why use this service?

The short answer is that it would take a long time to painstakingly design an image for every single blog post and every single documentation page. And we don't want the exact same image for every blog post because that wouldn't make the article stand out when it was shared to Twitter.

That's where `custom-og-image-generator.vercel.app` comes in. We can simply pass the title of our blog post to our generator service and it will generate the image for us on the fly!

It looks like the following:

```html
<head>
  <title>Hello World</title>
  <meta property="og:image" content="https://custom-og-image-generator.vercel.app/api/**Hello**%20World.png" />
</head>
```

Now try changing the text `Hello%20World` to the title of your choosing and watch the magic happen ✨

## Deploy your own

_**Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme).**_

Click the following button to open the configuration for deploying to vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/Ningensei848/og-image&project-name=og-image&repository-name=og-image)

You will see a screen similar to the following:

![the configuration page for deploying to vercel](.github/images/configure-project.png)

## How to use it?

[[underconstruction]]

## Author

[![Twitter is what's happening in the world and what people are talking about right now.](https://img.shields.io/badge/@Ningensei848-%231DA1F2.svg?&style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/Ningensei848)

[![](https://img.shields.io/badge/k.kubokawa@klis.tsukuba.ac.jp-%23757575.svg?&style=for-the-badge&logo=gmail&logoColor=EA4335)](mailto:k.kubokawa@klis.tsukuba.ac.jp)

## License

_This software is released under the [MIT License](LICENSE)._

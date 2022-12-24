function managePosts(posts) {
    var blog = document.querySelector('.blogs')
    posts.forEach(post => {
        blog.innerHTML += '<a class="hover:translate-y-1" href="/post?' + post._id + '">\
        <div class="overflow-hidden rounded-md bg-slate-800">\
          <div class="aspect-w-3 aspect-h-2"><img class="h-full w-full object-cover object-center"\
              src="' + post.image + '" alt="Image post" loading="lazy" /></div>\
          <div class="px-3 pt-4 pb-6 text-center">\
            <h2 class="text-xl font-semibold">' + post.title + '</h2>\
            <div class="mt-1 text-xs text-gray-400">' + post.date + '</div>\
            <div class="mt-2 text-sm">' + post.snippet + '</div>\
          </div>\
        </div>\
      </a>'
    });
} function load () {
    var url = '/api.blogs'
    fetch(url + '.get').then(data => {
        return data.json()
    }).then(objectData => {
        managePosts(objectData.data)
    })
}
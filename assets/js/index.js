"use strict"
const content = document.querySelectorAll("#content section");
const links = document.querySelectorAll("nav a");
const actLink = ['bg-blue-500/10', 'text-blue-400']
const classLink = ['text-slate-300', 'hover:bg-slate-800']
links.forEach(a => {
    a.addEventListener("click", () => {
        links.forEach(btn => {
            btn.classList.remove(...actLink,...classLink)
        })
        a.classList.add(...actLink)
        content.forEach(section => {
            section.id == a.getAttribute('data-section') ?section.classList.remove("hidden"):section.classList.add("hidden") 
        })
    })
});
async function api() {
    try{
        const req = await fetch(
            "https://lldev.thespacedevs.com/2.3.0/launches/upcoming"
        )
        if(!req.ok){
            throw new Error("Failed to fetch data");
        }
        const data = await req.json()
        display(data.results)
    }catch(error){
        console.log(error);
    }
}
function display(list) {
    let img = `
    <img class="w-full h-full object-cover" src="${list[0].image.image_url}" alt="">
    `
    document.getElementById("photo").innerHTML = img;
    document.getElementById("title").innerHTML = list[0].name
    document.getElementById("country").innerHTML = list[0].pad.country.name
    let blackBox = '';
    for (let i = 1; i < list.length; i++) {
        blackBox+=`
        <div
            class="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden hover:border-blue-500/30 transition-all group cursor-pointer"
        >
            <div
            class="relative h-48 bg-slate-900/50 flex items-center justify-center"
            >
            <img class="w-full h-full object-cover" src="${list[i].image.image_url?list[i].image.image_url:"./assets/images/launch-placeholder.png"}" alt="${list[i].name}">
            <div class="absolute top-3 right-3">
                <span
                class="px-3 py-1 bg-green-500/90 text-white backdrop-blur-sm rounded-full text-xs font-semibold"
                >
                Go
                </span>
            </div>
            </div>
            <div class="p-5">
            <div class="mb-3">
                <h4
                class="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors"
                >
                ${list[i].name}
                </h4>
                <p class="text-sm text-slate-400 flex items-center gap-2">
                <i class="fas fa-building text-xs"></i>
                SpaceX
                </p>
            </div>
            <div class="space-y-2 mb-4">
                <div class="flex items-center gap-2 text-sm">
                <i class="fas fa-calendar text-slate-500 w-4"></i>
                <span class="text-slate-300">Mar 15, 2024</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                <i class="fas fa-clock text-slate-500 w-4"></i>
                <span class="text-slate-300">23:00 UTC</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                <i class="fas fa-rocket text-slate-500 w-4"></i>
                <span class="text-slate-300">Falcon 9</span>
                </div>
                <div class="flex items-center gap-2 text-sm">
                <i class="fas fa-map-marker-alt text-slate-500 w-4"></i>
                <span class="text-slate-300 line-clamp-1">KSC, LC-39A</span>
                </div>
            </div>
            <div
                class="flex items-center gap-2 pt-4 border-t border-slate-700"
            >
                <button
                class="flex-1 px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-sm font-semibold"
                >
                Details
                </button>
                <button
                class="px-3 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors"
                >
                <i class="far fa-heart"></i>
                </button>
            </div>
            </div>
        </div>
        
        `
    }
    document.getElementById("launches-grid").innerHTML = blackBox
}
api()
const toggleBtn = document.getElementById("sidebar-toggle");
const aside = document.querySelector("aside");

toggleBtn.addEventListener("click", e => {
    e.stopPropagation();
    aside.classList.toggle("sidebar-open");
});

aside.addEventListener("click", e => {
    e.stopPropagation();
});

window.addEventListener("click", () => {
    aside.classList.remove("sidebar-open");
});

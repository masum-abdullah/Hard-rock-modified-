const searchBtn = document.getElementById('search-btn');
const search = document.getElementById('search-lyrics');
const songName = document.getElementById('song-name');
const author = document.getElementById('author');

const lyricsName = document.getElementsByClassName('lyrics-name');
const artistName = document.getElementsByClassName('artist-name')



searchBtn.addEventListener('click', function(){
    fetch(`https://api.lyrics.ovh/suggest/${search.value}`)
        .then(res => res.json())
        .then(data => displaySong(data))

        function displaySong(items){
            for(let i = 0; i < 10; i++){
                const getTitle = items.data[i].title;
                const getArtist = items.data[i].artist.name;

                lyricsName[i].innerText = getTitle;
                artistName[i].innerText = getArtist;
                document.querySelector('single-result')[i].style.display = 'block';

            }
        }
})
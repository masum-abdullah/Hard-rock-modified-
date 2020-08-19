const searchBtn = document.getElementById('search-btn');
const search = document.getElementById('search-lyrics');
const songName = document.getElementById('song-name');

const lyricsName = document.getElementsByClassName('lyrics-name');
const artistName = document.getElementsByClassName('artist-name');
const lyricBtn = document.getElementsByClassName('lyrics-button');
const bannerImg = document.getElementsByClassName('banner-img');



searchBtn.addEventListener('click', function(){
    fetch(`https://api.lyrics.ovh/suggest/${search.value}`)
        .then(res => res.json())
        .then(data => displaySong(data))

        function displaySong(items){
            for(let i = 0; i < 10; i++){
                const getTitle = items.data[i].title;
                const getArtist = items.data[i].artist.name;
                const getImg = items.data[i].album.cover;

                lyricsName[i].innerText = getTitle;
                artistName[i].innerText = getArtist;
                bannerImg[i].innerHTML = `<img src="${getImg}">`;
                lyricBtn[i].addEventListener('click', function(){
                    fetch(`https://api.lyrics.ovh/v1/${getArtist}/${getTitle}`)
                        .then(response => response.json())
                        .then(lyricData => {
                            document.querySelector('#songDescription').innerHTML = getTitle;
                            document.querySelector('#singerFullName').innerHTML = getArtist;

                            if(lyricData.lyrics == undefined){
                                document.querySelector('#songWithLyrics').innerHTML = 'lyrics Not Found.';
                                document.querySelector('#songWithLyrics').style.color = 'red';
                            }
                            else{
                                document.querySelector('#songWithLyrics').innerHTML = lyricData.lyrics;
                                document.querySelector('#songWithLyrics').style.color = 'white';
                            }
                        })
                })

            }
            document.querySelector('#search-results').style.display = 'block';


        }
})

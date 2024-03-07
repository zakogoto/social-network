import React from 'react'

export default function Music() {
  return (
    <div>
      <iframe frameborder="0" style={{'border':'none', 'width':'100%', 'height':'450px'}} src="https://music.yandex.ru/iframe/playlist/evpatlina/3">
        Слушайте <a _blank href='https://music.yandex.ru/users/evpatlina/playlists/3'>Мне нравится</a>
         — <a _blank href='https://music.yandex.ru/users/evpatlina'>Анастасия Смирнова</a> 
         на Яндекс Музыке
        </iframe>
    </div>
  )
}

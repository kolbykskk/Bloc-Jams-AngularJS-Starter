(function() {
  function SongPlayer(Fixtures){
    var SongPlayer = {};


    /**
    * @desc Get entire album object
    * @type {Object}
    */

    var currentAlbum = Fixtures.getAlbum();

    /**
    * @desc Buzz object audio file
    * @type {Object}
    */

    var currentBuzzObject = null;

    /**
    * @function setSong
    * @desc Sets the current song as SongPlayer.currentSong from Buzz
    * @param {Object} song
    */

    var setSong = function(song) {
      if(currentBuzzObject) {
        stopSong(song);
      }

      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      SongPlayer.currentSong = song;
    };

    /**
    * @function stopSong
    * @desc Stops currently playing song and sets .playing to null
    * @param {Object} song
    */

    var stopSong = function(song) {
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null;
    };

    /**
    * @function playSong
    * @desc Plays the song that is passed in and sets playing to true
    * @param {Object} song
    */

    var playSong = function(song) {
      currentBuzzObject.play();
      SongPlayer.currentSong.playing = true;
    }

    /**
    * @function getSongIndex
    * @desc Gets index of active song in Fixtures.js
    * @param {Object} song
    */

    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    }

    /**
    * @desc Current album song
    * @type {Object}
    */

    SongPlayer.currentSong = null;

    /**
    * @function SongPlayer.play
    * @desc If song is not playing run setSong(song) and playSong(song) otherwise if paused, run playSong(song)
    * @param {Object} song
    */

    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if(SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if(SongPlayer.currentSong === song) {
          if(currentBuzzObject.isPaused()) {
            playSong(song);
          }
        }
    };

    /**
    * @function SongPlayer.pause
    * @desc Pause the song using buzz and set playing to false
    * @param {Object} song
    */

    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    /**
    * @function SongPlayer.previous
    * @desc Gets the current song index and subtracts 1 to get and play the previous song
    */

    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;

      if(currentSongIndex < 0) {
        stopSong();
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    /**
    * @function SongPlayer.next
    * @desc Gets the current song index and adds 1 to get and play the next song
    */

    SongPlayer.next = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex++;

      if(currentSongIndex > currentAlbum.songs.length - 1) {
        stopSong();
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();

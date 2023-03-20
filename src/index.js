//const CalendarDates = import('calendar-dates');
import CalendarDates from 'calendar-dates';
const calendarDates = new CalendarDates();

const main = async () => {
  for (const meta of await calendarDates.getDates(new Date())) {
    console.log(meta);
  }

  for (const meta of await calendarDates.getMatrix(new Date())) {
    console.log(meta);
  }
};

main();
// const YouTube = require('youtube-sr').default;
// console.log(YouTube);
// // const videos = await YouTube.search('playing with fire', { limit: 3 });
// // console.log(videos.map((m, i) => `[${++i}] ${m.title} (${m.url})`).join('\n'));
// // YouTube.search('some nsfw query', { limit: 3, safeSearch: true })
// //   .then(x => console.log(x))
// //   .catch(console.error);
// YouTube.searchOne('the weeknd save your tears')
//   .then(res => console.log(res.url)) // https://www.youtube.com/watch?v=XXXXXXX
//   .catch(console.error);

// function searchByTopic() {
//   var mid = '/m/0gjf126';
//   var results = YouTube.Search.list('id,snippet', {topicId: mid, maxResults: 25});
//   for(var i in results.items) {
//     var item = results.items[i];
//     Logger.log('[%s] Title: %s', item.id.videoId, item.snippet.title);
//   }
// }
//===================================
//=====================================
// const Youtube = require('youtube-sdk');

// const YT = new Youtube();
// YT.use('AIzaSyCOd7Y3jAZspvMKYZ_dqAmR1Z0wReTUeh0');

// var params = {
//   part: 'snippet',
//   // location: '48.858319942162794,2.2944259643554683',
//   // locationRadius: '4000m',
//   maxResults: '1',
//   order: 'date',
//   type: 'video',
//   // publishedBefore: '2016-08-03T00:00:00Z', //Date Google
//   publishedAfter: '2016-08-02T00:00:00Z',
// };
// YT.get('pirate', params, function (err, data) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });
// fetch(
//   `https://googleapis.com/youtube/v3/search?key=AIzaSyCOd7Y3jAZspvMKYZ_dqAmR1Z0wReTUeh0?publishedAfter='1970-01-01T00:00:00Z'?q='pirate'?maxResults=1`
// ).then(response => console.log(response));

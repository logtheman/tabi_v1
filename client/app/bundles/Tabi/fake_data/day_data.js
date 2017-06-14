const FAKEDATA = [
	[{
			name: 'NahaNa Hotel & Spa',
			type: 'lodging',
			length: '1 night',
			allDay: true,
			checkIn: '5/18/17',
			checkOut: '5/19/17',
			location: '1-5 Kume 2 Chome, Naha, Okinawa-ken, 900-0033 Japan',
			lat: 26.2144722, 
			lng: 127.6763, 
			locationLink: 'https://www.google.com.tw/maps?q=1-5+Kume+2+Chome,+Naha,+Okinawa-ken,+900-0033+Japan&um=1&ie=UTF-8&sa=X&ved=0ahUKEwjZ9ry15I_UAhXMNpQKHYBtDDsQ_AUICigB',
		},
		{
			type:'food',
			allDay: false,
			startTime: 12,
			endTime: 13,
			time: '12PM - 1PM',
			activity: 'Lunch at うふやー',
			location: 'Japan, 〒905-0004 Okinawa Prefecture, Nago, Nakayama, ９０',
			lat: 26.62099, 
			lng: 127.96, 
			locationLink: 'https://www.google.com.tw/maps/place/%E7%99%BE%E5%B9%B4%E5%8F%A4%E5%AE%B6+%E5%A4%A7%E5%AE%B6%EF%BC%88%E3%81%86%E3%81%B5%E3%82%84%E3%83%BC%EF%BC%89/@26.6209963,127.9636717,15z/data=!4m5!3m4!1s0x0:0x6c5682a23a94e475!8m2!3d26.6209963!4d127.9636717"',
			notes: ''
		},
		{
			type:'activity',
			allDay: false,
			startTime: 14,
			endTime: 15,
			time: '2PM - 3PM',
			activity: 'Water Buffalo Tour of Mangroves',
			location: 'Japan, 〒905-0207 Okinawa-ken, Kunigami-gun, Motobu-chō, Bise, ３８９ 905 0207',
			lat: 26.7006,
			lng: 127.87,
			notes: 'Cost about $10 per person'
		},
		{
			type:'activity',
			allDay: false,
			startTime: 15,
			endTime: 16,
			time: '3PM - 4PM',
			activity: 'Churaumi Aquarium',
			lat: 26.5940,
			lng: 127.9752,
			location: 'Japan, 〒905-0206 Okinawa Prefecture, Kunigami District, Motobu, Ishikawa, ４２４',
			notes: 'Cost about $18 per person and can be bought from Family Mart'
		},
		{
			type:'food',
			allDay: false,
			startTime: 19,
			endTime: 21,
			time: '7PM - 9PM',
			activity: 'Dinner at やんばるダイニング 松の古民家',
			location: 'Japan, 〒905-0015 Okinawa Prefecture, Nago, 大南2-14-5',
			lat: 26.6941,
			lng: 127.8757,
			locationLink: "https://www.google.com/maps/dir/''/''/data=!4m5!4m4!1m0!1m2!1m1!1s0x34e4ff61c6b568cb:0x5adf9fe29ccf18fb?sa=X&ved=0ahUKEwjD-LnPm57UAhXj7oMKHcPHBMMQ9RcICzAA",
			link: 'https://www.facebook.com/matsunokominka',
			notes: ''
		},
	],
	[{
			name: 'Nago-Shi AirBnB',
			type: 'lodging',
			length: '1 night',
			allDay: true,
			checkIn: '5/19/17',
			checkOut: '5/20/17',
			location: '5-17-10 Agarie 町田アパート303号室 Nago-shi, Okinawa-ken 905-0021 Japan',
			lat: 26.5782368, 
			lng: 127.9824358, 
			locationLink: 'https://www.google.com/maps/place/Japan,+%E3%80%92905-0021+Okinawa-ken,+Nago-shi,+Agarie,+5+Chome%E2%88%92%EF%BC%91%EF%BC%97%E2%88%9210/@26.5782368,127.9824358,17z/data=!3m1!4b1!4m5!3m4!1s0x34e45583c588a183:0xef615a150ee0a376!8m2!3d26.5782368!4d127.9846245',
		},
		{
			type:'activity',
			allDay: false,
			startTime: 9.5,
			endTime: 10.5,
			time: '9:30AM - 10:30AM',
			activity: 'Canoeing in Mangroves',
			location: '',
			lat: 26.626858, 
			lng: 128.033123, 
			locationLink: '',
			notes: ''
		},
		{
			type:'food',
			allDay: false,
			startTime: 12,
			endTime: 13,
			time: '12PM - 1PM',
			activity: 'やちむん&カフェ 群青 pottery&cafe GUNJO',
			location: 'Japan, 〒904-0301 沖縄県Nakagami-gun, 中頭郡読谷村Zakimi, 座喜味2898-21',
			lat: 26.4079722,
			lng: 127.756743,
			notes: 'Pizza and pottery!'
		},
		{
			type:'activity',
			allDay: false,
			startTime: 14,
			endTime: 15,
			time: '2PM - 4PM',
			activity: 'Murasaki Mura Historical Village',
			lat: 26.4054008,
			lng: 127.7196946,
			location: 'Japan, 〒904-0323 Okinawa-ken, Nakagami-gun, Yomitan-son, Takashiho, １０２０−１',
			notes: 'Pottery activities!'
		},
	],
]

export default FAKEDATA;
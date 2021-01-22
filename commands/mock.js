const auctions = [{
    "id": "auction1",
    "status": "active",
    "lots": [{
        "id": "lot1",
        "title": "Title1",
        "description": "Description1",
        "startingPrice": 1000,
        "betPrice": 1000,
        "picture": "AgACAgIAAxkBAAILAmAFbUEx-IOMJ0mWJY0jpz0ORIFyAAJEsDEbhPsxSI_m1MRhNiFhqVxMni4AAwEAAwIAA20AA1KeAAIeBA",
        "status": "active",
        "isOver": false
    }, {
        "id": "lot2",
        "title": "Title2",
        "description": "Description2",
        "startingPrice": 2000,
        "betPrice": 2000,
        "picture": "AgACAgIAAxkBAAILEmAFbVXp_CfWCnqOU5rCBuU2DMWHAAJEsDEbhPsxSI_m1MRhNiFhqVxMni4AAwEAAwIAA20AA1KeAAIeBA",
        "status": "active",
        "isOver": false
    }],
    "datetime": "18/01/21 13:54",
    "takeCaption": "TakeTest",
    "takePicture": "AgACAgIAAxkBAAILT2AFdnt0U-0F07D8caf9QkSkHee4AAJSsDEbhPsxSCH2I8SuwjDvl41uly4AAwEAAwIAA20AA-LZBQABHgQ"
}, {
    "id": "auction2",
    "status": "stopped",
    "lots": [{
        "id": "testlot1",
        "title": "title1",
        "description": "descr1",
        "startingPrice": 123,
        "betPrice": 123,
        "picture": "AgACAgIAAxkBAAIL7mAFnLdQJ7llEwTp1wvB5okhnMF-AAILsTEbhPsxSJKOfegZrYUB_FIPni4AAwEAAwIAA20AA2SdAAIeBA",
        "status": "active"
    }],
    "datetime": "19/01/21 13:54",
    "takeCaption": "Take test 2",
    "takePicture": "AgACAgIAAxkBAAIL3mAFnF2XIz9FjsYWDG0KhmGkrTuBAAIJsTEbhPsxSJfHvLJwq67gracjmy4AAwEAAwIAA20AA9FgAQABHgQ"
}, {
    "id": "Auction1",
    "status": "active",
    "lots": [{
        "id": "1",
        "title": "БОКС  *ТРЕНИРОВОЧНЫЙ*",
        "description": "МЕГААУКЦИОН🥁⏰\nБОКС  *ТРЕНИРОВОЧНЫЙ*\nВес : 0,4 кг⚖️\n \n🥩ТРЕНИРОВОЧНЫЙ РИБАЙ 0.2 кг\n🥩ТРЕНИРОВОЧНЫЙ НЬЮ-ЙОРК 0,2 (Влажное вызревание) кг\n\nНАЧАЛЬНАЯ ЦЕНА: 140 грн  ⭕️",
        "startingPrice": 140,
        "betPrice": 140,
        "picture": "AgACAgIAAxkBAAIMRWAFwkOAK4ivtdT3pzMp7C6JoBFLAAJtsTEbN_UpSKqOlGLZ8R3EoEddmi4AAwEAAwIAA3gAA9KZAwABHgQ",
        "status": "active",
        "isOver": false
    }, {
        "id": "2",
        "title": "МЕГААУКЦИОН🥁⏰\nБОКС #125\nВес : 1,600 кг⚖️",
        "description": "🥩Т-боун стейк (Сухое вызревания) 0.5 кг\n🥩Рибай стейк (Сухое вызревание) 0,3 кг\n🥩Томагавк стейк (Влажное вызревание) 0,5кг\n🥩Нью-йорк стейк (Влажное вызревание) 0,3 кг\n\nНАЧАЛЬНАЯ ЦЕНА:750 грн  ⭕️\n\n❗️ Победитель тот ,чью ставку не перебьют в течении 3-х минут .",
        "startingPrice": 750,
        "betPrice": 750,
        "picture": "AgACAgIAAxkBAAIMW2AFwtDAkKrIrdWrobrrCV2sCp7SAAJvsTEbN_UpSPhvYIktPPFVK41uly4AAwEAAwIAA3gAA1jmBQABHgQ",
        "status": "active",
        "isOver": false
    }, {
        "id": "3",
        "title": "МЕГААУКЦИОН🥁⏰\nБОКС #123\nВес : 1,65 кг⚖️",
        "description": "🌿Мраморный стейк рибай (Влажного вызревания) 0.3 кг\n🌿Рибай стейк (Сухое вызревание) 0,3кг\n🌿Мраморный томагавк (Влажное вызревание) 0,55кг\n🌿Томагавк стейк (Сухое вызревание) 0,5 кг\n\nНАЧАЛЬНАЯ ЦЕНА: 750 грн  ⭕️\n⠀ \nПравила :\n❗️ Победитель тот ,чью ставку не перебьют в течении 3-х минут",
        "startingPrice": 750,
        "betPrice": 750,
        "picture": "AgACAgIAAxkBAAIMeWAFxARpHupBxilcGRyELoqG0V_DAAJzsTEbN_UpSAq1KNCWb444nz_wly4AAwEAAwIAA3gAA-bLBQABHgQ",
        "status": "active",
        "isOver": false
    }, {
        "id": "4",
        "title": "МЕГААУКЦИОН🥁⏰\nБОКС #120\nВес : 1кг⚖️",
        "description": "🔎Каре ягненка-0.35кг* 3 шт\n🔎Клаб стейк (влажное вызревание) -0.35кг\n🔎Рибай (влажное вызревание ) - 0.3кг\n\nНАЧАЛЬНАЯ ЦЕНА:380 грн  ⭕️\n⠀ \nПравила :\n❗️ Победитель тот ,чью ставку не перебьют в течении 3-х минут .",
        "startingPrice": 380,
        "betPrice": 380,
        "picture": "AgACAgIAAxkBAAIMiWAFxINbu6MleaNaNSXm99iZGIksAAJ0sTEbN_UpSL1iMWCz3Q6Clyfqly4AAwEAAwIAA3gAA07bBQABHgQ",
        "status": "active",
        "isOver": false
    }],
    "datetime": "18/01/21 19:30",
    "takeCaption": "🔥🔥🌟Отдаём ПОЧТИ ДАРОМ⭐️🔥",
    "takePicture": "AgACAgIAAxkBAAIMNWAFwe90QpJzowGNg80jOURG13X0AAJTsTEbN_UpSM0iWZ7fn0gJ8dVWmS4AAwEAAwIAA3gAA1GSAwABHgQ"
}];

Bot.setProperty('auction_all', auctions, 'Object');

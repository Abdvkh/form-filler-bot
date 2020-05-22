let sheet = Libs.GoogleSpreadSheet;

let data = {
   'box': '123',
   'price': '123',
   'location': 'Kharkiv',
   'delivery': 'Tashkent'
};

let prms = {
   sheetName: 'Auction',
   row: data,
   onSuccess:'onSuccess',
   onError: 'onError'
};

sheet.addRow(prms);

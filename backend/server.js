import express from 'express';
import mongodb from 'mongodb';
import bodyParser from 'body-parser';
import kladr from './kladr.json';

const app = express();
app.use(bodyParser.json());
// const dbUrl = 'mongodb://localhost:27017/citycode';

// const validate = data => {
//   let errors = {};
//   if (data.title === '') errors.title = "Can't be empty";
//   if (data.cover === '') errors.cover = "Can't be empty";
//   const isValid = Object.keys(errors).length === 0;
//   return { errors, isValid };
// };

// mongodb.MongoClient.connect(dbUrl, (err, db) => {
// app.get('/api/games', (req, res) =>
//   db.collection('kladr').find({}).toArray((err, games) => {
//     res.json({ games });
//   })
// );

// app.post('/api/games', (req, res) => {
//   const { errors, isValid } = validate(req.body);
//   if (isValid) {
//     const { title, cover } = req.body;
//     db.collection('games').insert({ title, cover }, (err, result) => {
//       if (err) {
//         res.status(500).json({ errors: { global: 'Something went wrong' } });
//       } else {
//         res.json({ game: result.ops[0] });
//       }
//     });
//   } else {
//     res.status(400).json({ errors });
//   }
// });

// app.put(`/api/games/:_id`, (req, res) => {
//   const { errors, isValid } = validate(req.body);
//   if (isValid) {
//     const { title, cover } = req.body;
//     db
//       .collection('games')
//       .findOneAndUpdate(
//         { _id: new mongodb.ObjectId(req.params._id) },
//         { $set: { title, cover } },
//         { returnOriginal: false },
//         (err, result) => {
//           if (err) {
//             res.status(500).json({ errors: { global: err } });
//           } else {
//             res.json({ game: result.value });
//           }
//         }
//       );
//   } else {
//     res.status(400).json({ errors });
//   }
// });

// app.get('/api/games/:_id', (req, res) => {
//   db
//     .collection('games')
//     .findOne({ _id: new mongodb.ObjectId(req.params._id) }, (err, game) => {
//       res.json({ game });
//     });
// });

// app.delete('/api/games/:_id', (req, res) => {
//   db
//     .collection('games')
//     .deleteOne(
//       // deleteOne parameters here are quiery object and callback function
//       { _id: new mongodb.ObjectId(req.params._id) },
//       (err, result) => {
//         if (err) {
//           res.status(500).json({ errors: { global: err } });
//         } else {
//           res.json({});
//         }
//       }
//     );
// });

//   app.use((req, res) => {
//     res.status(404).json({
//       errors: {
//         global: 'Still working on it. Please, try again later.'
//       }
//     });
//   });

//   app.listen(8080, () => console.log('Server is running on localhost:8080'));
// });

const findFive = term => {
  return kladr
    .filter(item => item['City'].toLowerCase().includes(term.toLowerCase()))
    .slice(0, 5);
};

app.get('/api/games/:_id', (req, res) => {
  db
    .collection('games')
    .findOne({ _id: new mongodb.ObjectId(req.params._id) }, (err, game) => {
      res.json({ game });
    });
});

app.use((req, res) => {
  res.status(404).json({
    errors: {
      global: 'Still working on it. Please, try again later.'
    }
  });
});

app.listen(8080, () => console.log('Server is running on localhost:8080'));

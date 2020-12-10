// scheme-model
const db = require('../../data/db-config');

module.exports = {
	find() {
		//  --SQL--
		//  select
		//      *
		//  from schemes
		//  -------
		return db('schemes');
	},
	findById(id) {
		//  --SQL--
		//  select
		//      *
		//  from schemes
		//  where id = 1;
		//  -------
		return db('schemes').where('id', id).first();
	},
	findSteps(id) {
		//  --SQL--
		//  select
		//     t.id,
		//     s.scheme_name,
		//     t.step_number,
		//     t.instructions
		//  from schemes s
		//  join steps t
		//     on t.scheme_id = s.id
		//  where s.id = 1
		//  order by t.step_number;
		//  -------
		return db('schemes as s')
			.join('steps as t', 't.scheme_id', 's.id')
			.select('t.id', 's.scheme_name', 't.step_number', 't.instructions')
			.where('s.id', id)
			.orderBy('t.step_number', 'asc');
	},
	add(scheme) {
		//  --SQL--
		//  INSERT INTO schemes (scheme_name)
		//  VALUES ('jake test');
		//  -------
		return db('schemes')
			.insert(scheme)
			.then(([id]) => {
				return db('schemes').where('id', id).first();
			});
	},
	update(changes, id) {
		//  --SQL--
		//  UPDATE schemes
		//  SET scheme_name = 'bar'
		//  WHERE id = 7;
		//  -------
		return db('schemes').where('id', id).update(changes);
	},
	remove(id) {
		//  --SQL--
		//  DELETE FROM schemes
		//  WHERE id = 7;
		//  -------
		return db('schemes').where('id', id).del();
	},
};

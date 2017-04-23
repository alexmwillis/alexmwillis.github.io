import Immutable from 'immutable';

const Paper = Immutable.Record({
  id: 0,
  title: '',
  author: '',
  reviewCount: 0
});

export default Paper;
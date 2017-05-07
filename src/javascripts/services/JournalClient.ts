import { OpenJournal, account } from './OpenJournal'
import Paper from '../types/Paper'

const JournalClient = {
  getInstance () {
    return new Promise((resolve, reject) => {
      OpenJournal
                .deployed()
                .then((instance:any) => resolve(instance))
                .catch((e:any) => {
                  console.log(e)
                  if (reject) {
                    reject(e)
                  };
                })
    })
  },
  getPaper (id:number) {
    return JournalClient
            .getInstance()
            .then((instance:{getPaper:any}) => {
              return instance
                    .getPaper
                    .call(id)
            })
            .then(paper => {
              return {
                id: id,
                title: paper[1].valueOf(),
                author: paper[0].valueOf(),
                reviewCount: paper[2].valueOf()
              }
            })
  },
  getPapers () {
    return JournalClient
            .getPaperCount()
            .then(count => {
              const ids = Array.from(Array(count).keys())
              const getPapers = ids.map(JournalClient.getPaper)
              return Promise.all(getPapers)
            })
  },
  getPaperCount () {
    return JournalClient
            .getInstance()
            .then((instance:{getPaperCount:any}) => {
              return instance
                    .getPaperCount
                    .call()
            })
            .then(count => {
              return parseInt(count.valueOf())
            })
  },
  uploadPaper (title:string) {
    return JournalClient
            .getInstance()
            .then((instance:{uploadPaper:any}) => {
              return instance.uploadPaper(title, { from: account })
            })
  },
  reviewPaper (id:number) {
    return JournalClient
            .getInstance()
            .then((instance:{reviewPaper:any}) => {
              return instance.reviewPaper(id, { from: account })
            })
  }
}

export default JournalClient

export class SimpleIterator {
  constructor(collection) {
    this.collection = collection
    this.index = 0
  }

  hasNext() {
    return this.index < this.collection.length
  }

  next() {
    const value = this.collection[this.index]
    this.index += 1
    return value
  }

  prev() {
    this.index -= 1
    return this.collection[this.index]
  }

  current() {
    return this.collection[this.index]
  }

  last() {
    this.index = this.collection.length - 1
    return this.collection[this.index]
  }
}

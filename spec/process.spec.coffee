Process = require '../lib/process'

describe 'process', ->
  process = null

  beforeEach ->
    process = new Process 'test'

  it 'should have a name ', ->
    expect(process.getName()).toEqual 'test'

  it 'should accept logs', ->
    process.addLog 'this is a log'
    expect(process.getLogs()[0].message).toEqual 'this is a log'

  it 'should allow stats to be set', ->
    process.setStat 'number', 10
    expect(process.getStats().number).toEqual [10]

  it 'should allow stats to be incremented', ->
    process.setStat 'number', 10
    process.incStat 'number', 1
    expect(process.getStats().number).toEqual [10, 11]

  it 'should allow stats to be decremented', ->
    process.setStat 'number', 10
    process.decStat 'number', 1
    expect(process.getStats().number).toEqual [10, 9]

  it 'should allow multiple stats to be reset', ->
    process.setStat 'stat1', 1
    process.setStat 'stat2', 1
    process.setStat 'stat3', 1
    process.resetStats 'stat1,stat3'
    expect(process.getStats().stat1).toEqual [0]
    expect(process.getStats().stat2).toEqual [1]
    expect(process.getStats().stat3).toEqual [0]

  it 'should allow stats to be removed', ->
    process.setStat 'stat', 1
    process.removeStat 'stat'
    expect(process.getStats().stat).toEqual undefined

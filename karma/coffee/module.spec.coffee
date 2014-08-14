'use strict'

describe 'Module', () ->
  module = {}

  beforeEach ->
    module = angular.module 'personalDictApp'

  it 'should be registered', () ->
    expect(module).not.toBe undefined

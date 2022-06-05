const assert = require('assert')
const useTransform = require('../src/helpers/useTransform')
const config = require('../src/utils/config')
const sinon = require('sinon')
const mockFs = require('mock-fs')
const path = require('path')
const fs = require('fs')
const Logger = require('../src/services/Logger')

describe('useTransform test suite', () => {
    it('kebab transform should return filename transformed to kebab case', () => {
        const filename = 'testFile'
        const result = useTransform.kebabCaseTransform(filename)

        assert.equal(result, 'test-file')
    })
    it('snake transform should return filename transformed to snake case', () => {
        const filename = 'testFile'
        const result = useTransform.snakeCaseTransform(filename)

        assert.equal(result, 'test_file')
    })
    it('pascal transform should return filename transformed to pascal case', () => {
        const filename = 'testFile'
        const result = useTransform.pascalCaseTransform(filename)

        assert.equal(result, 'TestFile')
    })
    it('camel transform should return filename transformed to camel case', () => {
        const filename = 'testFile'
        const result = useTransform.camelCaseTransform(filename)

        assert.equal(result, filename)
    })
    it('cutExtension should returns name without extension', () => {
        const filename = 'testFile1.js'
        const result = useTransform.cutExtensionTransform(filename)

        assert.equal(result, 'testFile1')
    })
    it('cutExtension should returns filename if extension not included', () => {
        const filename = 'testFile2'
        const result = useTransform.cutExtensionTransform(filename)

        assert.equal(result, filename)
    })
    it('removeSeparators should returns name without - separator', () => {
        const filename = 'test-File2'
        const result = useTransform.removeSeparatorsTransform(filename)

        assert.equal(result, 'testFile2')
    })
    it('removeSeparators should returns name without . separator', () => {
        const filename = 'test.File2'
        const result = useTransform.removeSeparatorsTransform(filename)

        assert.equal(result, 'testFile2')
    })
    it('removeSeparators should returns name without transformation if separator not provided', () => {
        const filename = 'testFile2'
        const result = useTransform.removeSeparatorsTransform(filename)

        assert.equal(result, filename)
    })
    it('getType should returns correct function by type: kebab', () => {
        const type = 'kebab'
        const result = useTransform.getCorrectTransformType(type)

        assert.equal(result.name, 'kebabCaseTransform')
    })
    it('getType should returns correct function by type: snake', () => {
        const type = 'snake'
        const result = useTransform.getCorrectTransformType(type)

        assert.equal(result.name, 'snakeCaseTransform')
    })
    it('getType should returns correct function by type: pascal', () => {
        const type = 'pascal'
        const result = useTransform.getCorrectTransformType(type)

        assert.equal(result.name, 'pascalCaseTransform')
    })
    it('getType should returns correct function by type: camel', () => {
        const type = 'camel'
        const result = useTransform.getCorrectTransformType(type)

        assert.equal(result.name, 'camelCaseTransform')
    })
})

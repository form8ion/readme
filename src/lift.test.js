import {promises as fs} from 'node:fs';
import {remark} from 'remark';
import readmePlugin from '@form8ion/remark-readme';
import legacyMarkerPlugin from '@form8ion/remark-update-legacy-badge-markers';
import badgePlugin from '@form8ion/remark-inject-badges';

import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import any from '@travi/any';
import {when} from 'jest-when';

import remarkConfig from '../.remarkrc.mjs';
import lift from './lift.js';

vi.mock('node:fs');
vi.mock('remark');

describe('lift', () => {
  let use, process;
  const badges = any.simpleObject();
  const documentation = any.simpleObject();
  const projectRoot = any.string();
  const pathToReadmeFile = `${projectRoot}/README.md`;
  const existingFileContents = any.string();
  const updatedFileContents = any.string();

  beforeEach(() => {
    const data = vi.fn();
    use = vi.fn();
    process = vi.fn();

    remark.mockReturnValue({data});
    when(data).calledWith('settings', remarkConfig.settings).mockReturnValue({use});
    when(use).calledWith(legacyMarkerPlugin).mockReturnValue({use});
    when(use).calledWith(badgePlugin, badges).mockReturnValue({use});
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should update the readme', async () => {
    when(use).calledWith(readmePlugin, documentation).mockReturnValue({process});
    when(fs.readFile).calledWith(pathToReadmeFile, 'utf8').mockResolvedValue(existingFileContents);
    when(process).calledWith(existingFileContents).mockReturnValue(updatedFileContents);

    await lift({projectRoot, results: {badges, documentation}});

    expect(fs.writeFile).toHaveBeenCalledWith(pathToReadmeFile, updatedFileContents);
  });

  it('should default `documentation` content to an empty object', async () => {
    when(use).calledWith(readmePlugin, {}).mockReturnValue({process});
    when(fs.readFile).calledWith(pathToReadmeFile, 'utf8').mockResolvedValue(existingFileContents);
    when(process).calledWith(existingFileContents).mockReturnValue(updatedFileContents);

    await lift({projectRoot, results: {badges}});

    expect(fs.writeFile).toHaveBeenCalledWith(pathToReadmeFile, updatedFileContents);
  });

  it('should reject the promise when a processing error occurs', async () => {
    const error = new Error('from test');
    when(use).calledWith(readmePlugin, documentation).mockReturnValue({process});
    process.mockImplementation(() => {
      throw error;
    });

    expect(() => lift({results: {badges, documentation}})).rejects.toThrowError(error);
  });
});

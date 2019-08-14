import { mjml2html } from 'mjml';
import loaderUtils from 'loader-utils';

export default function mjmlLoader(content) {
  this.cacheable();

  const result = mjml2html(content);

  if (result.errors.length) {
    const errorMsg = `[mjml-loader] ERROR in ${this.resourcePath}:
    ${result.errors.map(error => `- ${error.formattedMessage}`)}`;

    const error = new Error(errorMsg);
    error.code = 'MJML_INVALID';

    throw error;
  }

  const options = loaderUtils.getOptions(this);

  if (options.raw) {
    return result.html;
  }

  return `export default ${JSON.stringify(result.html)};`;
}

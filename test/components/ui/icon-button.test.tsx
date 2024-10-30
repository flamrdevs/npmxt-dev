import { describe, expect, it } from 'vitest';

import { render } from '@solidjs/testing-library';
import '@testing-library/jest-dom/vitest';

import { IconButton, iconButtonVariants } from '~/components/ui/icon-button';

describe('IconButton', () => {
	it('Rendered', () => {
		const { getByTestId } = render(() => <IconButton data-testid="root" class="additional class" />);

		const element = getByTestId('root');

		expect(element).toBeDefined();
		expect(element).toHaveClass(iconButtonVariants({}, 'additional class'));
	});
});

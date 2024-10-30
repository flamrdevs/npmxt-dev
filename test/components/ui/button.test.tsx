import { describe, expect, it } from 'vitest';

import { render } from '@solidjs/testing-library';
import '@testing-library/jest-dom/vitest';

import { Button, buttonVariants } from '~/components/ui/button';

describe('Button', () => {
	it('Rendered', () => {
		const { getByTestId } = render(() => <Button data-testid="root" class="additional class" />);

		const element = getByTestId('root');

		expect(element).toBeDefined();
		expect(element).toHaveClass(buttonVariants({}, 'additional class'));
	});
});

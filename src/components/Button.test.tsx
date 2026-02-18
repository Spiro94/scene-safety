import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Button from './Button';


describe('Button', () => {
    it('renders correctly', () => {
        render(<Button>Primary</Button>)
        expect(screen.getByRole('button')).toHaveTextContent('Primary');
    });

    it('should allow onClick', async () => {
        const user = userEvent.setup();
        const onClick = jest.fn();
        render(<Button onClick={onClick}>Primary</Button>)
        await user.click(screen.getByRole('button', { name: /primary/i }));
        expect(onClick).toHaveBeenCalledTimes(1);
    })

    describe('when disabled', () => {
        it('should not allow onClick', async () => {
            const user = userEvent.setup();
            const onClick = jest.fn();
            render(<Button disabled={true} onClick={onClick}>Primary</Button>)
            expect(screen.getByRole('button')).toHaveTextContent('Primary');
            expect(screen.getByRole('button')).toBeDisabled();
            await user.click(screen.getByRole('button', { name: /primary/i }));
            expect(onClick).not.toHaveBeenCalled();
        });
    });
})





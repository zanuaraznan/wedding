import { useGuestParams } from '@/lib/hooks';

interface GuestProps<T extends React.ElementType> {
    as?: T;
}

export default function Guest<T extends React.ElementType>({
    as,
    ...props
}: GuestProps<T> & React.ComponentPropsWithoutRef<T>) {
    const guest = useGuestParams();
    const Component = as ?? 'div';
    return (
        guest && (
            <Component {...props}>
                Dear, <span className='font-medium'>{guest}</span>
            </Component>
        )
    );
}

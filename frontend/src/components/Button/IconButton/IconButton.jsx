import classNames from 'classnames/bind';

import styles from './IconButton.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const IconButton = ({
    to,
    href,
    // css type, defult = text
    primary = false,
    secondary = false,
    primaryBorder = false,
    secondaryBorder = false,
    secondaryOutline = false,
    transparent = false,
    disabled = false,
    noClick = false,
    // size, defult = medium
    small = false,
    large = false,
    active,
    children,
    className,
    onClick,
    ...passProps
}) => {
    let Comp = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    if (to) {
        props.to = to;
        Comp = Link;
    } else if (href) {
        props.href = href;
        Comp = 'a';
    }

    if (disabled) {
        delete props.onClick;
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key];
            }
        });
    }

    const classes = cx('icon-button', {
        [className]: className,
        primary,
        secondary,
        primaryBorder,
        secondaryBorder,
        secondaryOutline,
        transparent,
        disabled,
        'no-click': noClick,
        small,
        large,
        active,
    });

    return (
        <Comp className={classes} {...props}>
            {children}
        </Comp>
    );
};

export default IconButton;

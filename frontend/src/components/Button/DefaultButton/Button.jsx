import classNames from 'classnames/bind';

import styles from './DefaultButton.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Button = ({
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
    // border type, default = cat canh
    curved = false,
    // size, defult = medium
    small = false,
    large = false,
    // icon
    leftIcon,
    rightIcon,
    // others
    width = 'fit-content',
    contentCenter = true,
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

    const classes = cx('button', {
        [className]: className,
        primary,
        secondary,
        primaryBorder,
        secondaryBorder,
        secondaryOutline,
        transparent,
        disabled,
        'no-click': noClick,
        curved,
        small,
        large,
        active,
    });

    return (
        <Comp className={classes} {...props} style={{ width: width }}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('content', { center: contentCenter })}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}{' '}
        </Comp>
    );
};

export default Button;

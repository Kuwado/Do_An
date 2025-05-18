import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './UploadImages.module.scss';
import Image from '@/components/Image';
import { Button, IconButton } from '@/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faXmark } from '@fortawesome/free-solid-svg-icons';
import { uploadImages } from '../../services/UploadService';

const cx = classNames.bind(styles);
const IMAGE_URL = import.meta.env.VITE_BACKEND_URL;

const UploadImages = ({ images = [], setImages, id = 'images', limit = 9, submit = false, append = false }) => {
    const [message, setMessage] = useState('');

    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        const total = append ? images.length + files.length : files.length;

        if (total > limit) {
            alert(`Chỉ được chọn tối đa ${limit} ảnh.`);
            return;
        }

        setMessage('');
        if (append) {
            setImages([...images, ...files]);
        } else {
            setImages(files);
        }
    };

    const handleUploadImages = async (e) => {
        const res = await uploadImages(images);
        if (!res.success) {
            setMessage(res.message);
        } else {
            alert(res.message);
        }
    };

    return (
        <div className={cx('upload-images')}>
            <div className={cx('actions')}>
                <label htmlFor={id}>
                    Hình ảnh: <FontAwesomeIcon icon={faUpload} />
                </label>
                <input type="file" multiple onChange={handleImagesChange} id={id} />
                {submit && (
                    <Button className={cx('submit-btn')} onClick={handleUploadImages}>
                        Thêm ảnh
                    </Button>
                )}
            </div>
            <div className={cx('images')}>
                {images &&
                    images.length > 0 &&
                    images.map((image, index) => {
                        console.log(image instanceof File ? URL.createObjectURL(image) : `${IMAGE_URL}${image}`);
                        return (
                            <Image
                                key={index}
                                src={image instanceof File ? URL.createObjectURL(image) : `${IMAGE_URL}${image}`}
                                alt={`image${index}`}
                            />
                        );
                    })}
            </div>
            {append && images.length > 0 && (
                <IconButton className={cx('delete-btn')} onClick={() => setImages([])}>
                    <FontAwesomeIcon icon={faXmark} />
                </IconButton>
            )}
        </div>
    );
};

export default UploadImages;

import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './CreateCard.scss';
import { CardType } from '../@types/cardData';
import { getMyCardData, getMyCards, updateMyCard } from '../services/cards';

const mapToAllowedFields = (card: CardType) => ({ 
    title: card.title,
    subtitle: card.subtitle,
    description: card.description,
    phone: card.phone,
    email: card.email,
    web: card.web,
    image: {
        url: card.image.url,
        alt: card.image.alt
    },
    address: {
        state: card.address.state,
        country: card.address.country,
        city: card.address.city,
        street: card.address.street,
        houseNumber: card.address.houseNumber,
        zip: card.address.zip
    }
});


const UpdateCard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useAuth();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm<CardType>();

    useEffect(() => {
        getMyCardData(id ?? "")
            .then(res => {
                const data = res.data;
                // Populate form with existing card data
                for (const key in data) {
                    setValue(key as keyof CardType, data[key]);
                }
            }).catch(err => {
                console.error('Error fetching card:', err);
            });
    }, [id, token, setValue]);




    const onUpdateCard = (card: CardType) => {
        const sanitizedCard = mapToAllowedFields(card);
        updateMyCard( id ?? "",sanitizedCard )
            .then(() => {
                navigate('/my-cards');
            })
            .catch(err => {
                console.error('Error updating card:', err);
                if (err.response) {
                    console.error('API Error Response:', err.response.data); // Log error response
                }
            });
    };



    return (
        <div className="create-card-container bg-purple-900  text-white dark:bg-slate-600">
            <form noValidate onSubmit={handleSubmit(onUpdateCard)}>
                <h2>Update Card</h2>
                {/* Title */}
                <section>
                    <input
                        className="create-card-input"
                        placeholder="Title"
                        {...register('title', { required: 'This field is mandatory' })}
                    />
                    {errors.title && <p className="error-text">{errors.title.message}</p>}
                </section>

                {/* Subtitle */}
                <section>
                    <input
                        className="create-card-input"
                        placeholder="Subtitle"
                        {...register('subtitle')}
                    />
                </section>

                {/* Description */}
                <section>
                    <textarea
                        className="create-card-input"
                        placeholder="Description"
                        {...register('description')}
                    />
                </section>

                {/* Phone */}
                <section>
                    <input
                        className="create-card-input"
                        placeholder="Phone"
                        {...register('phone')}
                    />
                </section>

                {/* Email */}
                <section>
                    <input
                        className="create-card-input"
                        placeholder="Email"
                        {...register('email')}
                    />
                </section>

                {/* Web */}
                <section>
                    <input
                        className="create-card-input"
                        placeholder="Web"
                        {...register('web')}
                    />
                </section>

                {/* Image URL */}
                <section>
                    <input
                        className="create-card-input"
                        placeholder="Image URL"
                        {...register('image.url')}
                    />
                </section>

                {/* Image Alt */}
                <section>
                    <input
                        className="create-card-input"
                        placeholder="Image Alt"
                        {...register('image.alt')}
                    />
                </section>

                {/* Address */}
                <section>
                    <input
                        className="create-card-input"
                        placeholder="State"
                        {...register('address.state')}
                    />
                </section>
                <section>
                    <input
                        className="create-card-input"
                        placeholder="Country"
                        {...register('address.country')}
                    />
                </section>
                <section>
                    <input
                        className="create-card-input"
                        placeholder="City"
                        {...register('address.city')}
                    />
                </section>
                <section>
                    <input
                        className="create-card-input"
                        placeholder="Street"
                        {...register('address.street')}
                    />
                </section>
                <section>
                    <input
                        className="create-card-input"
                        placeholder="House Number"
                        {...register('address.houseNumber')}
                    />
                </section>
                <section>
                    <input
                        className="create-card-input"
                        placeholder="Zip"
                        {...register('address.zip')}
                    />
                </section>

                <button type="submit" className="submit-button">Update</button>
            </form>
        </div>
    );
};

export default UpdateCard;

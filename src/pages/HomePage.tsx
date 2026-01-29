import React from 'react';
import { useNavigate, Page } from 'zmp-ui';
import { Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Ассеты
import bgImage from '../assets/bg.webp';

// Компоненты
import { RedButton } from '../components/common/RedButton';
import { SmallButton } from '../components/common/SmallButton';

const HomePage = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    return (
        <Page className="relative flex flex-col min-h-screen overflow-hidden">
            {/* Фон */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 z-0"
            >
                <img src={bgImage} alt="Background" className="w-full h-full object-cover" />
            </motion.div>

            {/* Контент */}
            <div className="relative z-10 flex flex-col justify-end h-full pb-24 px-4 items-center min-h-screen">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    className="flex flex-col items-center gap-10 w-full"
                >
                    <RedButton
                        label={t('home.start')}
                        onClick={() => navigate('/camera')}
                    />

                    {/* Язык */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.5 }}
                    >
                        <SmallButton
                            label={i18n.language === 'vi' ? 'EN' : 'VN'}
                            onClick={() => i18n.changeLanguage(i18n.language === 'vi' ? 'en' : 'vi')}
                            large // Новый проп для увеличенного размера
                        />
                    </motion.div>
                </motion.div>
            </div>
        </Page>
    );
};

export default HomePage;

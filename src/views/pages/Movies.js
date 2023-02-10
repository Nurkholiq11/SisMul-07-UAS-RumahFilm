import { useEffect, useState } from 'react';
import axios from 'axios';

// third party
import { useTheme } from '@mui/system';
import { styled, alpha } from '@mui/material/styles';
import { Container, Grid, Box, Stack, InputBase, Card, Typography, Backdrop, Modal, Fade, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PerfectScrollbar from 'react-perfect-scrollbar';
import Youtube from 'react-youtube';

// project imports
import AnimateButton from 'ui-component/button/AnimateButton';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#fff',
    '&:hover': {
        backgroundColor: '#fff'
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto'
    }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '30ch'
            }
        }
    }
}));

// modal
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

export default function Movies() {
    const theme = useTheme();

    // movie
    const API_URL = `https://api.themoviedb.org/3/`;
    const API_KEY = `3bdd4dafdf3ead32020ff3bd9d660aed`;
    const SEARCH_API = API_URL + 'search/movie';
    const DISCOVER_API = API_URL + 'discover/movie';
    const BACKDROP_PATH = 'https://image.tmdb.org/t/p/w1280';

    const [loading, setLoading] = useState(true);
    const [playing, setPlaying] = useState(false);
    const [trailer, setTrailer] = useState(null);
    const [movies, setMovies] = useState([]);
    const [searchKey, setSearchKey] = useState('');
    const [movie, setMovie] = useState({ title: 'Loading Movies' });

    console.log(trailer);

    useEffect(() => {
        fetchMovies();
    }, []);

    useEffect(() => {
        fetchMovies();
    }, [searchKey]);

    const fetchMovies = async (event) => {
        if (event) {
            event.preventDefault();
        }

        setLoading(true);

        const { data } = await axios.get(`${searchKey ? SEARCH_API : DISCOVER_API}`, {
            params: {
                api_key: API_KEY,
                query: searchKey
            }
        });

        setMovies(data.results);
        setLoading(false);

        if (data.results.length) {
            await fetchMovie(data.results[0].id);
        }
    };

    const fetchMovie = async (id) => {
        setLoading(true);
        const { data } = await axios.get(`${API_URL}movie/${id}`, {
            params: {
                api_key: API_KEY,
                append_to_response: 'videos'
            }
        });

        if (data.videos && data.videos.results) {
            const trailer = data.videos.results.find((vid) => vid.name === 'Official Trailer');
            setTrailer(trailer ? trailer : data.videos.results[0]);
        }

        setMovie(data);
        setLoading(false);
    };

    const selectMovie = (movie) => {
        fetchMovie(movie.id);
        setPlaying(false);
        setMovie(movie);
        window.scrollTo(0, 0);
    };

    // modal
    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = (item) => {
        setOpenModal(true);
        selectMovie(item);
        fetchMovie(item);
    };
    const handleCloseModal = () => {
        setOpenModal(false);
    };

    console.log(movie);

    return (
        <Box sx={{ backgroundColor: theme.palette.primary.main }}>
            <PerfectScrollbar
                style={{
                    height: '100vh',
                    paddingLeft: '8px',
                    paddingRight: '10px'
                }}
            >
                <Container>
                    <Grid container gap={10} pt={8}>
                        {/* heading */}
                        <Grid item xs={12}>
                            <Typography variant="h1" sx={{ color: theme.palette.text.white, textAlign: 'center' }}>
                                Rumah Film
                            </Typography>
                        </Grid>

                        {/* heading action */}
                        <Grid item xs={12}>
                            <Stack flexDirection="row" justifyContent="space-between">
                                <Typography variant="h2">Daftar Film</Typography>
                                <form>
                                    <Search>
                                        <SearchIconWrapper>
                                            <SearchIcon />
                                        </SearchIconWrapper>
                                        <StyledInputBase
                                            placeholder="Cari film"
                                            onInput={(event) => setSearchKey(event.target.value)}
                                            inputProps={{ 'aria-label': 'search' }}
                                        />
                                    </Search>
                                </form>
                            </Stack>
                        </Grid>
                        <Grid item xs={12}>
                            {loading ? (
                                <Stack sx={{ width: '100%' }} alignItems="center" gap={4}>
                                    <CircularProgress sx={{ color: '#fff' }} />
                                    <Typography variant="h4">Sedang Memuat Data</Typography>
                                </Stack>
                            ) : (
                                <Grid container gap={0.5} display="flex" flexDirection="row" justifyContent="space-evenly" flexWrap="wrap">
                                    {movies.length > 0 ? (
                                        <>
                                            {movies.map((item, i) => (
                                                <Grid
                                                    item
                                                    xs={2.7}
                                                    mb={3}
                                                    key={i}
                                                    sx={{ cursor: 'pointer' }}
                                                    onClick={() => handleOpenModal(item)}
                                                >
                                                    <Card sx={{ p: 1 }}>
                                                        <Stack>
                                                            <Box sx={{ width: '100%', overflow: 'hidden' }}>
                                                                <Box
                                                                    component="img"
                                                                    src={BACKDROP_PATH + item.poster_path}
                                                                    sx={{
                                                                        width: '100%',
                                                                        '&:hover': { transition: 'transform 2.5s', transform: 'scale(1.5)' }
                                                                    }}
                                                                />
                                                            </Box>
                                                            <Stack mt={2} gap={1}>
                                                                <Typography variant="h6" sx={{ color: '#0F1014' }}>
                                                                    {item.original_title}
                                                                </Typography>
                                                                <Typography variant="h6 " sx={{ color: '#0F1014' }}>
                                                                    {item.release_date}
                                                                </Typography>
                                                                <Typography variant="h6" sx={{ color: '#0F1014', textAlign: 'right' }}>
                                                                    {item.popularity}
                                                                </Typography>
                                                            </Stack>
                                                        </Stack>
                                                    </Card>
                                                </Grid>
                                            ))}
                                        </>
                                    ) : (
                                        <Typography variant="h4">Data Tidak Ditemukan</Typography>
                                    )}
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Container>
                {/* modal */}
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500
                    }}
                >
                    <Fade in={openModal}>
                        <Box sx={style}>
                            {movie ? (
                                <div className="poster">
                                    <Box>
                                        <Box sx={{ width: '100%', overflow: 'hidden' }}>
                                            <Stack sx={{ width: '100%' }}>
                                                {playing ? (
                                                    <Youtube
                                                        videoId={trailer.key}
                                                        className={'youtube amru'}
                                                        containerClassName={'youtube-container amru'}
                                                        opts={{
                                                            width: '100%',
                                                            height: '100%',
                                                            playerVars: {
                                                                autoplay: 1,
                                                                controls: 0,
                                                                cc_load_policy: 0,
                                                                fs: 0,
                                                                iv_load_policy: 0,
                                                                modestbranding: 0,
                                                                rel: 0,
                                                                showinfo: 0
                                                            }
                                                        }}
                                                    />
                                                ) : (
                                                    <Stack sx={{ width: '100%' }} justifyContent="center" alignItems="center">
                                                        <Box
                                                            component="img"
                                                            src={BACKDROP_PATH + movie.backdrop_path}
                                                            sx={{
                                                                width: '40%'
                                                            }}
                                                        />
                                                    </Stack>
                                                )}
                                            </Stack>
                                            <Stack mt={2} gap={2}>
                                                {movie ? (
                                                    <>
                                                        {/* judul */}
                                                        <Grid container>
                                                            <Grid item xs={2}>
                                                                <Typography variant="h6" sx={{ color: '#000' }}>
                                                                    Judul
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={0.5}>
                                                                <Typography variant="h6" sx={{ color: '#000' }}>
                                                                    :
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={9.5}>
                                                                <Typography variant="h6" sx={{ color: '#000' }}>
                                                                    {movie.original_title}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                        {/* tanggal */}
                                                        <Grid container>
                                                            <Grid item xs={2}>
                                                                <Typography variant="h6" sx={{ color: '#000' }}>
                                                                    Tanggal Tayang
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={0.5}>
                                                                <Typography variant="h6" sx={{ color: '#000' }}>
                                                                    :
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={9.5}>
                                                                <Typography variant="h6" sx={{ color: '#000' }}>
                                                                    {movie.release_date}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                        {/* pendapatan */}
                                                        <Grid container>
                                                            <Grid item xs={2}>
                                                                <Typography variant="h6" sx={{ color: '#000' }}>
                                                                    Pendapatan
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={0.5}>
                                                                <Typography variant="h6" sx={{ color: '#000' }}>
                                                                    :
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={9.5}>
                                                                <Typography variant="h6" sx={{ color: '#000' }}>
                                                                    {movie.revenue}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                        {/* durasi */}
                                                        <Grid container>
                                                            <Grid item xs={2}>
                                                                <Typography variant="h6" sx={{ color: '#000' }}>
                                                                    Durasi
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={0.5}>
                                                                <Typography variant="h6" sx={{ color: '#000' }}>
                                                                    :
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={9.5}>
                                                                <Typography variant="h6" sx={{ color: '#000' }}>
                                                                    {movie.runtime} Menit
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                        {/* sinopsis */}
                                                        <Grid container>
                                                            <Grid item xs={2}>
                                                                <Typography variant="h6" sx={{ color: '#000' }}>
                                                                    Sinopsis
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={0.5}>
                                                                <Typography variant="h6" sx={{ color: '#000' }}>
                                                                    :
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={9.5}>
                                                                <Typography variant="h6" sx={{ color: '#000' }}>
                                                                    {movie.overview}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                        {/* trailer */}
                                                        <Grid container>
                                                            <Grid item xs={2}>
                                                                <Typography variant="h6" sx={{ color: '#000' }}>
                                                                    Trailer
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={0.5}>
                                                                <Typography variant="h6" sx={{ color: '#000' }}>
                                                                    :
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={9.5}>
                                                                {trailer ? (
                                                                    <>
                                                                        {playing ? (
                                                                            <AnimateButton>
                                                                                <Typography
                                                                                    variant="h6"
                                                                                    onClick={() => setPlaying(false)}
                                                                                    sx={{
                                                                                        width: 'fit-content',
                                                                                        py: 1,
                                                                                        px: 2,
                                                                                        borderRadius: '20px',
                                                                                        border: '1px solid #000',
                                                                                        cursor: 'pointer',
                                                                                        backgroundColor: '#0F1014',
                                                                                        color: '#fff'
                                                                                    }}
                                                                                >
                                                                                    Berhenti Putar Trailer
                                                                                </Typography>
                                                                            </AnimateButton>
                                                                        ) : (
                                                                            <AnimateButton>
                                                                                <Typography
                                                                                    variant="h6"
                                                                                    onClick={() => setPlaying(true)}
                                                                                    sx={{
                                                                                        width: 'fit-content',
                                                                                        py: 1,
                                                                                        px: 2,
                                                                                        borderRadius: '20px',
                                                                                        border: '1px solid #000',
                                                                                        cursor: 'pointer',
                                                                                        backgroundColor: '#0F1014',
                                                                                        color: '#fff'
                                                                                    }}
                                                                                >
                                                                                    Putar Trailer
                                                                                </Typography>
                                                                            </AnimateButton>
                                                                        )}
                                                                    </>
                                                                ) : (
                                                                    <Typography variant="h6" sx={{ color: '#000' }}>
                                                                        Trailer Tidak Tersedia
                                                                    </Typography>
                                                                )}
                                                            </Grid>
                                                        </Grid>
                                                    </>
                                                ) : (
                                                    <CircularProgress />
                                                )}
                                            </Stack>
                                        </Box>
                                    </Box>
                                </div>
                            ) : null}
                        </Box>
                    </Fade>
                </Modal>
            </PerfectScrollbar>
        </Box>
    );
}

import { Grid, Stack, Typography, Link } from '@mui/material';
import { useTheme } from '@mui/system';

// project imports
import Modal from './Modal';

function Detail({ openDetail, setOpenDetail, selected }) {
  const theme = useTheme();

  return (
    <>
      <Modal
        open={openDetail}
        onClose={() => setOpenDetail(false)}
        onConfirm={() => setOpenDetail(false)}
        title={'Detail Data Kunjungan'}
        btnConfirm="OK"
      >
        <Stack>
          {/* nama pengunjung */}
          <Grid container mb={2}>
            <Grid item xs={2.5}>
              <Typography variant="title">Nama Pengunjung</Typography>
            </Grid>
            <Grid item xs={0.3}>
              :
            </Grid>
            <Grid item xs={9.2}>
              <Typography variant="title2">{selected.name}</Typography>
            </Grid>
          </Grid>
          {/* tanggal kunjungan */}
          <Grid container mb={2}>
            <Grid item xs={2.5}>
              <Typography variant="title">Tanggal Kunjungan</Typography>
            </Grid>
            <Grid item xs={0.3}>
              :
            </Grid>
            <Grid item xs={9.2}>
              <Typography variant="title2">{selected.date}</Typography>
            </Grid>
          </Grid>
          {/* asal */}
          <Grid container mb={2}>
            <Grid item xs={2.5}>
              <Typography variant="title">Asal</Typography>
            </Grid>
            <Grid item xs={0.3}>
              :
            </Grid>
            <Grid item xs={9.2}>
              <Typography variant="title2">{selected.origin}</Typography>
            </Grid>
          </Grid>
          {/* kepentingan */}
          <Grid container mb={2}>
            <Grid item xs={2.5}>
              <Typography variant="title">Kepentingan</Typography>
            </Grid>
            <Grid item xs={0.3}>
              :
            </Grid>
            <Grid item xs={9.2}>
              <Typography variant="title2">{selected.interest}</Typography>
            </Grid>
          </Grid>
          {/* jumlah orang */}
          <Grid container mb={2}>
            <Grid item xs={2.5}>
              <Typography variant="title">Jumlah Orang</Typography>
            </Grid>
            <Grid item xs={0.3}>
              :
            </Grid>
            <Grid item xs={9.2}>
              <Typography variant="title2">{selected.qty}</Typography>
            </Grid>
          </Grid>
          {/* nama file */}
          <Grid container mb={2}>
            <Grid item xs={2.5}>
              <Typography variant="title">Nama File</Typography>
            </Grid>
            <Grid item xs={0.3}>
              :
            </Grid>
            <Grid item xs={9.2}>
              <Typography variant="title2">
                {selected.file !== null && selected.file !== 'https://res.cloudinary.com/secretariat-dprd-bandung/image/upload/v1674474368/null'
                  ? selected.filename
                  : 'Tidak ada file yang terlampir'}
              </Typography>
            </Grid>
          </Grid>
          {/* file */}
          <Grid container mb={2} alignItems="center">
            <Grid item xs={2.5}>
              <Typography variant="title">File</Typography>
            </Grid>
            <Grid item xs={0.3}>
              :
            </Grid>
            <Grid item xs={9.2}>
              {selected.file !== null && selected.file !== 'https://res.cloudinary.com/secretariat-dprd-bandung/image/upload/v1674474368/null' ? (
                <Link
                  size="small"
                  variant="title"
                  href={selected.file}
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    border: '1px solid #103b74',
                    py: 1,
                    px: 2,
                    borderRadius: 2,
                    cursor: 'pointer',
                    '&:hover': {
                      color: theme.palette.text.paper,
                      backgroundColor: theme.palette.primary.main,
                    },
                  }}
                  target="_blank"
                >
                  Lihat File
                </Link>
              ) : (
                <Typography variant="title2">Tidak ada file yang terlampir</Typography>
              )}
            </Grid>
          </Grid>
        </Stack>
      </Modal>
    </>
  );
}

export default Detail;

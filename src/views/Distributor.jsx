import {
  Box,
  Container,
  HStack,
  Text,
  Button,
  Grid,
  ButtonGroup,
} from '@chakra-ui/react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
} from '@chakra-ui/react';
import { Skeleton } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { Badge } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { FiChevronDown, FiEdit, FiFilter, FiPlus } from 'react-icons/fi';
import useOverview from '../hooks/useOverview';
import useDistributor from '../hooks/useDistributor';

import Header from '../components/Header';

function Distributor() {
  const overview = useOverview({});
  const distributor = useDistributor({});
  const [data, setData] = useState([]);
  const [date, setDate] = useState([]);
  const [type, setType] = useState(['date']);
  const setDetails = () => {
    distributor?.data?.rows?.map((col) => {
      const final = col.buyer.waktuMulai;
      setDate(final);
    });
    console.log(date, 'cek');
  };

  useEffect(() => {
    setDetails();
    //     const sortAscending = (label) => {
    //         console.log(label);
    //         const labels = {
    //             date: 'date',
    //             status: 'status'
    //         }
    //         const sortParam = labels[label]
    //         const ascending = distributor.data.rows.buyer.waktuMulai.sort((a, b) => a[sortParam] - b[sortParam])
    //         setData(ascending)

    //     }

    //     const sortDescanding = (label) => {
    //         const labels = {
    //             date: 'date',
    //             status: 'status'
    //         }
    //         const sortParam = labels[label]
    //         const descending = distributor.data.rows.buyer.waktuMulai.sort((a, b) => b[sortParam] - a[sortParam])
    //         setData(descending)

    //     }
    //     sortAscending(type)
    //     sortDescanding(type)
  }, []);
  const __renderBadge = (status) => {
    const label = {
      true: (
        <Badge variant="subtle" colorScheme="blue">
          Active
        </Badge>
      ),
      Inactive: <Badge>Inactive</Badge>,
      Pending: <Badge>Pending</Badge>,
    };

    return label[status];
  };

  return (
    <Box backgroundColor="#F6F6F6">
      <Header />
      <Container
        maxW={[
          'container.sm',
          'container.md',
          'container.lg',
          'container.xl',
          '90em',
        ]}
        px={{ base: '1rem', md: '2rem', lg: '6rem' }}
      >
        <HStack justify="space-between" py="5" as="section">
          <Text fontWeight="bold" fontSize="xl">
            Overview
          </Text>
          <Menu>
            <MenuButton as={Button} rightIcon={<FiChevronDown />}>
              Last 30 Days
            </MenuButton>
            <MenuList>
              <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
              <MenuItem>Delete</MenuItem>
              <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
          </Menu>
        </HStack>
        {overview.isSuccess ? (
          <Grid
            templateColumns="repeat(auto-fit, minmax(272px, 1fr))"
            gap={4}
            as="section"
          >
            <Box backgroundColor="#FFFFFF" p="5">
              <Text color="#B6B9BF" fontSize="sm">
                Total Sub Distributor
              </Text>
              <Text fontSize="4xl" fontWeight="bold">
                {overview?.data?.total}
              </Text>
            </Box>
            <Box backgroundColor="#FFFFFF" p="5">
              <Text color="#B6B9BF" fontSize="sm">
                Active Sub Distributor
              </Text>
              <Text fontSize="4xl" fontWeight="bold">
                {overview?.data?.active}
              </Text>
            </Box>
            <Box backgroundColor="#FFFFFF" p="5">
              <Text color="#B6B9BF" fontSize="sm">
                Inactive Sub Distributor
              </Text>
              <Text fontSize="4xl" fontWeight="bold">
                {overview?.data?.inactive}
              </Text>
            </Box>
          </Grid>
        ) : (
          <Grid templateColumns="repeat(auto-fit, minmax(272px, 1fr))" gap={4}>
            <Box height="115px" width="auto">
              <Skeleton
                height="115px"
                h="full"
                fadeDuration={0.8}
                width="auto"
              />
            </Box>
            <Box height="115px" width="auto">
              <Skeleton
                height="115px"
                h="full"
                fadeDuration={0.8}
                width="auto"
              />
            </Box>
            <Box height="115px" width="auto">
              <Skeleton
                height="115px"
                h="full"
                fadeDuration={0.8}
                width="auto"
              />
            </Box>
          </Grid>
        )}

        <HStack justify="space-between" py="5" as="section">
          <Text fontWeight="bold" fontSize="xl">
            Sub Distribution List
          </Text>
          <HStack>
            <Menu>
              <MenuButton as={Button} leftIcon={<FiFilter />}>
                Filter
              </MenuButton>
              <MenuList>
                <MenuGroup>
                  <ButtonGroup size="sm" isAttached variant="outline" px="2">
                    <Button>Ascending</Button>
                    <Button>Descending</Button>
                  </ButtonGroup>
                </MenuGroup>
                <MenuGroup title="Sort By">
                  <Menu as={Button} rightIcon={<FiChevronDown />}>
                    <MenuButton px="4">Date Purchased</MenuButton>
                    <MenuList onChange={(e) => setType(e.target.value)}>
                      <MenuItem value="date">Date Purchased</MenuItem>
                      <MenuItem value="status">Status</MenuItem>
                    </MenuList>
                  </Menu>
                </MenuGroup>
              </MenuList>
            </Menu>
            <Button bgColor="#2C8CCB" color="#FFFFFF">
              <FiPlus />
              Add New Sub Distributor
            </Button>
          </HStack>
        </HStack>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Admin Name</Th>
              <Th>Company Name</Th>
              <Th>Company Email</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {distributor.isSuccess ? (
              distributor.data.rows.map((col) => {
                return (
                  <Tr>
                    <Td>1</Td>
                    <Td>{col.namaDepan + col.namaBelakang}</Td>
                    <Td>{col.Company.perusahaan}</Td>
                    <Td>{col.Company.surel}</Td>
                    <Td>{__renderBadge(col.statusKeaktifan)}</Td>
                    <Td>
                      <FiEdit />
                    </Td>
                  </Tr>
                );
              })
            ) : (
              <Box>
                <Text>Loading...</Text>
              </Box>
            )}
          </Tbody>
        </Table>
      </Container>
    </Box>
  );
}

export default Distributor;

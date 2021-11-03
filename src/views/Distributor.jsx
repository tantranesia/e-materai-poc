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
import { useMediaQuery } from '@chakra-ui/media-query';
import { useTheme } from '@chakra-ui/system';
import axios from 'axios';

import useOverview from '../hooks/useOverview';
import useDistributor from '../hooks/useDistributor';
import Header from '../components/Header';

function Distributor() {
  const overview = useOverview({});
  const distributor = useDistributor({});
  const [data, setData] = useState([]);
  const [date, setDate] = useState([]);
  const [selected, setSelected] = useState(null);
  const [count, setCount] = useState(0);
  const theme = useTheme();
  const [isSmallerThan768] = useMediaQuery(
    `(max-width : ${theme.sizes.container.md})`
  );
  const [isLargerThan1200] = useMediaQuery(
    `(min-height : ${theme.sizes.container.xl})`
  );
  const token = localStorage.getItem('token');

  const number = () => {
    // for (var count = 0; count > distributor.data.rows.length; count++) {
    //   setCount(count)
    //   return count;
    // }
    const n = distributor.data.rows.length

  };
  const arr = [distributor.length];

  useEffect(() => {
    axios
      .get(
        'https://wwb6j89602.execute-api.ap-southeast-1.amazonaws.com/dev/buyer?sort=name&filter=all&page=1',
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        console.log(res.data.data.rows);
        setDate(res.data.data.rows);
      });
  }, []);

  const dummy = [
    {
      namaDepan: 'Ary',
      eat: 'mekdi',
    },
    {
      namaDepan: 'Bry',
      eat: 'mekdi',
    },
    {
      namaDepan: 'Cry',
      eat: 'mekdi',
    },
    {
      namaDepan: 'Dry',
      eat: 'mekdi',
    },
  ];

  const sortAscending = (key) => {
    console.log(key);
    setSelected(key);
    const ascending = date.sort((a, b) => {
      return a.namaDepan - b.namaDepan;
    });
    setData(ascending);
  };

  const sortDescanding = (key) => {
    setSelected(key);
    console.log(key);
    const descending = date
      .sort((a, b) => {
        return a.namaDepan - b.namaDepan;
      })
      .reverse();
    setData(descending);
  };

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
    <Box backgroundColor="#F6F6F6" minH={[
      'container.sm',
      'container.md',
      'container.lg',
      'container.xl',
    ]}>
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
                    <Button data-key="asc" onClick={() => sortAscending('asc')}>
                      Ascending
                    </Button>
                    <Button
                      data-key="dsc"
                      onClick={() => sortDescanding('dsc')}
                    >
                      Descending
                    </Button>
                  </ButtonGroup>
                </MenuGroup>
                <MenuGroup title="Sort By">
                  <Menu as={Button} rightIcon={<FiChevronDown />}>
                    <MenuButton px="4">Date Purchased</MenuButton>
                    <MenuList>
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
        <Table
          variant="simple"
          size={isSmallerThan768 ? 'sm' : 'md'}
          overflow="auto"
        >
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Admin Name</Th>
              <Th>Company Name</Th>
              <Th>Company Email</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          {selected === null ? (
            <Tbody>
              {distributor.isSuccess ? (
                distributor.data.rows.map((col) => {
                  return (
                    <Tr>
                      <Td>{
                  
                      }</Td>
                      <Td>{col.namaDepan + ' ' + col.namaBelakang}</Td>
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
          ) : (
            <Tbody>
              {data.map((col) => {
                return (
                  <Tr>
                    <Td>{distributor.data.rows.length}</Td>
                    <Td>{col.namaDepan + ' ' + col.namaBelakang}</Td>
                    <Td>{col.Company.perusahaan}</Td>
                    <Td>{col.Company.surel}</Td>
                    <Td>{__renderBadge(col.statusKeaktifan)}</Td>
                    <Td>
                      <FiEdit />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          )}
        </Table>
      </Container>
    </Box>
  );
}

export default Distributor;

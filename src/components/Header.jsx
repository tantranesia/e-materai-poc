import {
  Box,
  HStack,
  Image,
  Text,
  Divider,
  Button,
  Icon,
} from '@chakra-ui/react';
import React from 'react';
import { FiBell, FiChevronDown, FiUser } from 'react-icons/fi';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from '@chakra-ui/media-query';
import { useTheme } from '@chakra-ui/system';
// import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

import logo from '../assets/MicrosoftTeams-image (4).png';

function Header() {
  const theme = useTheme();
  const [isSmallerThan768] = useMediaQuery(
    `(max-width : ${theme.sizes.container.md})`
  );
  const token = localStorage.getItem('token');
  const logOut = () => {
    localStorage.clear();
    window.location.href = '/login';
  };
  return (
    <Box bgColor="#2C8CCB">
      <HStack justify="space-between">
        <Link to="/login">
          <Image src={logo} />
        </Link>
        <HStack color="#FFFFFF" spacing={isSmallerThan768 ? "10px" : "35px"}>
          <Text fontSize={isSmallerThan768 ? '10px' : '15px'}>Home</Text>
          <Text fontSize={isSmallerThan768 ? '10px' : '15px'}>
            Sub Distributor Management
          </Text>
        </HStack>
        <HStack justify="space-between" px="5">
          <Icon
            as={FiBell}
            color="#FFFFFF"
            mr={2.5}
            boxSize={isSmallerThan768 ? 3 : 5}
          />

          <Divider orientation="vertical" height="50px" width="3px" px="1" />
          {!token ? (
            <Link to="/login">
              <Button>Log In</Button>
            </Link>
          ) : (
            <>
              <Icon
                as={FiUser}
                color="#FFFFFF"
                mr={2.5}
                boxSize={isSmallerThan768 ? 3 : 5}
              />
              <Menu isLazy>
                <MenuButton bgColor="#2C8CCB">
                  <HStack>
                    <Text
                      color="#FFFFFF"
                      fontSize={isSmallerThan768 ? '10px' : '15px'}
                    >
                      Distributor 1
                    </Text>
                    <FiChevronDown color="#FFFFFF" />
                  </HStack>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={logOut}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </>
          )}
        </HStack>
      </HStack>
    </Box>
  );
}

export default Header;

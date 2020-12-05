package com.skilldistillery.bbqueggle.entities;

import static org.junit.jupiter.api.Assertions.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class PitMasterTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Pitmaster pitmaster;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		 emf = Persistence.createEntityManagerFactory("BBQPU");

	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		pitmaster = em.find(Pitmaster.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		pitmaster = null;
	}
	@Test
	void test() {
		assertNotNull(pitmaster);
		assertEquals("Larry", pitmaster.getFirstName());
		assertEquals("Dude", pitmaster.getLastName());
	}
	@Test
	void test2() {
		assertNotNull(pitmaster);
		assertNotNull(pitmaster.getRestaurant());
		assertEquals("Rudy's \"Country Store\" and Bar-B-Q", pitmaster.getRestaurant().getName());
	}

}

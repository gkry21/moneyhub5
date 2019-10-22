package com.moneyhub5.web.persistence;

import static org.junit.Assert.fail;

import java.sql.Connection;

import javax.sql.DataSource;

import org.junit.Test;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;

import com.moneyhub5.web.config.RootConfig;

import lombok.Setter;
import lombok.extern.log4j.Log4j;

@ContextConfiguration(classes = {RootConfig.class})
@MapperScan(basePackages = {"com.moneyhub5.web"})
@Log4j
public class DataSourceTest {
	@Setter(onMethod_ = {@Autowired})
	private DataSource dataSource;
	@Test
	public void testConnection() {
		try(Connection con = dataSource.getConnection()){
			log.info(con);
		} catch (Exception e) {
			fail(e.getMessage());
		}
	}

}


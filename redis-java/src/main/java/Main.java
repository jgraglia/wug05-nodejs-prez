import org.apache.commons.lang3.Validate;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.Protocol;
import redis.clients.jedis.exceptions.JedisConnectionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.net.InetSocketAddress;

class Main {
	public static void main(String[] args) {
		new Main().start();
	}
	private Logger log =LoggerFactory.getLogger(getClass());

	public void start() {
		RedisPublisher publisher = new RedisPublisher().withChannel("wug");
		while (true) {
			String message = System.console().readLine("message: ");
			publisher.publishToRedis(message);
		}
	}
}
